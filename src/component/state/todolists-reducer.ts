import {FilterValuesType, ToDoListType} from '../../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    toDoListID: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
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

const initialState: Array<ToDoListType> = []

// export const toDoListID_1 = v1()
// export const toDoListID_2 = v1()
//
// const initialState: Array<ToDoListType> = [
//     {id: toDoListID_1, title: 'What to learn?', filter: 'all'},
//     {id: toDoListID_2, title: 'What to buy?', filter: 'all'},
// ]


export const todolistsReducer = (state: Array<ToDoListType> = initialState, action: ActionType): Array<ToDoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST':
            const newToDoLIst: ToDoListType = {id: action.toDoListID, title: action.title, filter: 'all'}
            return [newToDoLIst, ...state]
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
            return state
            // throw new Error('I don\'t understand this type')

    }
}


export const removeTodoListAC = (toDoListID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: toDoListID}
}
//
export const addTodolistsAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, toDoListID: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
