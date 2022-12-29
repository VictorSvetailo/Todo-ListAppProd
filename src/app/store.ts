import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {configureStore, current} from '@reduxjs/toolkit'
import {FieldErrorType} from '../api/types'
import {rootReducer} from './reducers'
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {
    loadState1,
    loadState2,
    saveState1,
    saveState2
} from '../utils/local-storage/local-storage';

export type RootReducerType = typeof rootReducer
//
// VS important! I took out the creation of root Reducer from the store in order for Hot Module Replacement to work correctly
//
// непосредственно создаём store ghb помощи configureStore

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        application: {
            applicationChangingTheme: loadState1(),
            currentWindow: loadState2()
            // applicationChangingTheme: JSON.parse(localStorage.getItem("application-state") as string)
        }
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    }).prepend(thunkMiddleware)

})
store.subscribe(() => {
    // @ts-ignore
    saveState1(store.getState().application.applicationChangingTheme)
    // @ts-ignore
    saveState2(store.getState().application.currentWindow)
    // localStorage.setItem('application-state', JSON.stringify(store.getState().application.applicationChangingTheme))
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppActionsType = any
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store
export type ThunkError = {
    rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> }
}

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer)
    })
}
