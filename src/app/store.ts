import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {configureStore, current} from '@reduxjs/toolkit'
import {FieldErrorType} from '../api/types'
import {rootReducer} from './reducers'
import {TypedUseSelectorHook, useSelector} from 'react-redux';
// import {loadState, saveState} from '../utils/local-storage/local-storage';
// import {
//     persistStore, persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

export type RootReducerType = typeof rootReducer
//
// VS important! I took out the creation of root Reducer from the store in order for Hot Module Replacement to work correctly
//
// непосредственно создаём store ghb помощи configureStore




// const persistConfig = {
//     key: 'root',
//     storage,
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)




let preloadedState
const persistedTodosString = localStorage.getItem('application-state')
if (persistedTodosString) {
    preloadedState = JSON.parse(persistedTodosString)
}

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        application: {
            applicationChangingTheme: false
        }
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // serializableCheck: {
        //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // },
    }).prepend(thunkMiddleware)

})
store.subscribe(() => {
    // saveState({
    //     application: store.getState().application.applicationChangingTheme
    // })
    localStorage.setItem('application-state', JSON.stringify(store.getState().application.applicationChangingTheme))
})



// export const persistor = persistStore(store)

// export default store

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// все типы action lkz всего App
export type AppActionsType = any

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store
//const

// export type AppDispatchType = type store.dispatch



export type ThunkError = {
    rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> }
}

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer)
    })
}
