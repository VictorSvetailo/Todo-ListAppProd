import {TasksStateType} from '../../AppWithRedux';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {v1} from 'uuid';
import {useReducer} from 'react';


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    toDoListID: string
    taskID: string
}
export type AdTaskActionType = {
    type: 'ADD-TASK'
    toDoListID: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    toDoListID: string
    taskID: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    toDoListID: string
    taskID: string
    title: string
}

type ActionType = RemoveTaskActionType
    | AdTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}
// const initialState: TasksStateType = {
//     [toDoListID_1]: [
//         {id: v1(), title: 'HTML', isDone: false},
//         {id: v1(), title: 'CSS ', isDone: false},
//         {id: v1(), title: 'JS/TS ', isDone: false},
//     ],
//     [toDoListID_2]: [
//         {id: v1(), title: 'Milk', isDone: false},
//         {id: v1(), title: 'Bread', isDone: false},
//         {id: v1(), title: 'Apple', isDone: false},
//     ]
// }

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.toDoListID]: state[action.toDoListID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.toDoListID]: [...state[action.toDoListID], {id: v1(), title: action.title, isDone: false}]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(t => t.id !== action.taskID ? t : {...t, isDone: action.isDone})
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(t => t.id !== action.taskID ? t : {
                    ...t,
                    title: action.title
                })
            }
        case 'ADD-TODOLIST':
            const stateCopy = {...state}
            stateCopy[action.toDoListID] = []
            return stateCopy
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;
        }

        default:
            return state

    }
}

export const removeTaskAC = (toDoListID: string, taskID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', toDoListID, taskID}
}

export const addTaskAC = (toDoListID: string, title: string): AdTaskActionType => {
    return {type: 'ADD-TASK', toDoListID: toDoListID, title: title}
}

export const changeTaskStatusAC = (toDoListID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', toDoListID, taskID, isDone}
}

export const changeTaskTitleAC = (toDoListID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', toDoListID, taskID, title}
}
