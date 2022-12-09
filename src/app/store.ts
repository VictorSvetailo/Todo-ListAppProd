import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import {FieldErrorType} from '../api/types';
import {rootReducer} from './reducers';


export type RootReducerType = typeof rootReducer
//
// VS important! I took out the creation of root Reducer from the store in order for Hot Module Replacement to work correctly
//
// непосредственно создаём store ghb помощи configureStore
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>;

// все типы action lkz всего App
export type AppActionsType = any;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>;

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
// export type AppDispatch = typeof store.dispatch
// export type AppDispatch = any
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

// export type AppDispatchType = type store.dispatch


export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }


if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer)
    })
}