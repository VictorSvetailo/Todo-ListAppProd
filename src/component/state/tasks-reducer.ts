import {TasksStateType} from '../../App';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {v1} from 'uuid';


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistID: string
    taskID: string
}
export type AdTaskActionType = {
    type: 'ADD-TASK'
    todolistID: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    taskID: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistID: string
    taskID: string
    title: string
}

type ActionType = RemoveTaskActionType
    | AdTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistID]: [...state[action.todolistID], {id: '4', title: action.title, isDone: true}]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id !== action.taskID ? t : {
                    ...t,
                    isDone: action.isDone
                })
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id !== action.taskID ? t : {
                    ...t,
                    title: action.title
                })
            }
        case 'ADD-TODOLIST':
            const stateCopy = {...state}
            stateCopy[action.todolistID] = []
            return stateCopy
        case 'REMOVE-TODOLIST':{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;
        }

        default:
            throw new Error('I don\'t understand this type')

    }
}

export const removeTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID, taskID}
}

export const addTaskAC = (todolistID: string, title: string): AdTaskActionType => {
    return {type: 'ADD-TASK', todolistID, title: title}
}

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistID, taskID, isDone}
}

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistID, taskID, title}
}
