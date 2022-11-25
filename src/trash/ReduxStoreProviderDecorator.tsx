import {AppRootStateType, RootReducerType, store} from '../app/store';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {tasksReducer} from '../features/TodoListsList/TodoList/Task/tasks-reducer';
import {appReducer} from '../app/app-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todoLists-api';
import {todoListsReducer} from '../features/TodoListsList/todoLists-reducer';
import {v1} from 'uuid';
import {authReducer} from '../features/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import ReactDOM from 'react-dom';
import {App} from '../app/App';
import React from 'react';
import {BrowserRouter, HashRouter} from 'react-router-dom';

const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer

});

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {
            id: 'todolistId1',
            title: 'Whattolearn',
            filter: 'all',
            entityStatus: 'idle',
            addedDate: '',
            order: 0,
        },
        {
            id: 'todolistId2',
            title: 'Whattobuy',
            filter: 'all',
            entityStatus: 'loading',
            addedDate: '',
            order: 0,
        },
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'ReactBook',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
        ],
    },
    app: {
        error: null,
        status: 'succeeded',
        isInitialized: true,
    },
    auth: {
        isLoggedIn: true,
    },
};

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})
export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)


export const BrowserRouterDecorator = (storyFn: any) => (
    <HashRouter>
        {storyFn()}
    </HashRouter>)
