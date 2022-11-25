import {tasksReducer } from "../features/TodoListsList/TodoList/Task/tasks-reducer";
import { todoListsReducer } from "../features/TodoListsList/todoLists-reducer";
import { combineReducers } from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { useDispatch } from "react-redux";
import { authReducer } from "../features/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

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
// определить типы в ручную
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
