import {todoListsAPI, TodoListType} from '../../api/todoLists-api';
import {Dispatch} from 'redux';
import {RequestStatusType, setStatusAC, SetStatusAT} from '../../app/app-reduser';

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'SET_TODOLISTS':
            // в данном случае мы используем map
            // для того чтобы преобразовать массив с server под наш type
            return action.todoLists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
        // throw new Error('I don\'t understand this type')
    }
}

// actions
export const addTodoListsAC = (todoList: TodoListType) =>
    ({type: 'ADD-TODOLIST', todoList}) as const
export const removeTodoListAC = (toDoListID: string) =>
    ({type: 'REMOVE-TODOLIST', id: toDoListID} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)
export const setToDoListsAC = (todoLists: TodoListType[]) =>
    ({type: 'SET_TODOLISTS', todoLists} as const)

// thunks
export const fetchTodoListTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setStatusAC('loading'))
    todoListsAPI.getTodoLists()
        .then((res) => {
            dispatch(setToDoListsAC(res.data))
            dispatch(setStatusAC('succeeded'))
        })
}
export const addTodoListsTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setStatusAC('loading'))
    todoListsAPI.createTodoLists(title)
        .then((res) => {
            dispatch(addTodoListsAC(res.data.data.item))
            dispatch(setStatusAC('succeeded'))
        })
}
export const removeTodoListTC = (toDoListID: string) => (dispatch: ThunkDispatch) => {
    dispatch(setStatusAC('loading'))
    todoListsAPI.deleteTodoLists(toDoListID)
        .then((res) => {
            dispatch(removeTodoListAC(toDoListID))
            dispatch(setStatusAC('succeeded'))
        })
}
export const changeTodoListTitleTC = (toDoListID: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setStatusAC('loading'))
    todoListsAPI.updateTodoLists(toDoListID, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(toDoListID, title))
            dispatch(setStatusAC('succeeded'))
        })
}

// - types -
export type AddTodoListActionType = ReturnType<typeof addTodoListsAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type SetTodoListActionType = ReturnType<typeof setToDoListsAC>
type ActionType =
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

const initialState: Array<TodoListDomainType> = []


export type FilterValuesType = 'all' | 'completed' | 'active';
export type ThunkDispatch = Dispatch<ActionType | SetStatusAT>

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

