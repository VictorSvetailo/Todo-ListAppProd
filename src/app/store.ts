import {tasksReducer} from '../features/TodoListsList/TodoList/Task/tasks-reducer';
import {todoListsReducer} from '../features/TodoListsList/todoLists-reducer';
import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {appReducer} from './app-reducer';
import {useDispatch} from 'react-redux';
import {authReducer} from '../features/Auth/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {useMemo} from 'react';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});

export type RootReducerType = typeof rootReducer

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
export const useAppDispatch = () => useDispatch<AppDispatch>();

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
// export type AppDispatch = typeof store.dispatch
// export type AppDispatch = any
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

// export type AppDispatchType = type store.dispatch


export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
    return boundActions
}