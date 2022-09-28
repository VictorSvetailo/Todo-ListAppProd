import {FilterValuesType, ToDoListType} from '../../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export const todolistsReducer = (state: Array<ToDoListType>, action: ActionType): Array<ToDoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST':
            const newToDoLIst: ToDoListType = {id: v1(), title: action.title, filter: 'all'}
            return [...state, newToDoLIst]
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            const todoListFilter = state.find(tl => tl.id === action.id)
            if (todoListFilter) {
                todoListFilter.filter = action.filter
            }
            return [...state]
        default:
            throw new Error('I don\'t understand this type')

    }
}


export const removeTodoListAC = (toDoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: toDoListId}
}
//
export const addTodolistsAC = (title: string): AddTodolistActionType => {
    return {title: title, type: 'ADD-TODOLIST'}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
