import {v1} from 'uuid';
import {todoListsAPI, TodoListType} from '../../api/todoLists-api';



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
    | SetTodoListActionType

const initialState: Array<TodoListDomainType> = []


export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'SET_TODOLISTS': {
            // в данном случае мы используем map
            // для того чтобы преобразовать массив с server под наш type
            return action.todoLists.map(el => ({...el, filter: 'all'}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST':
            const newToDoLIst: TodoListDomainType = {
                id: action.toDoListID,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0,
            }
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
export const addTodoListsAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, toDoListID: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}


export const setToDoListsAC = (todoLists: TodoListType[]): SetTodoListActionType => {
    return {type: 'SET_TODOLISTS', todoLists}
}




// export type SetToDoListType = ReturnType<typeof setToDoListsAC>

export const fetchTodoListTC = () => {
    return (dispatch: any) => {
        todoListsAPI.getTodoLists()
            .then((res) => {
                dispatch(setToDoListsAC(res.data))
            })
    }
}

type SetTodoListActionType = {
    type: 'SET_TODOLISTS'
    todoLists: TodoListType[]
}

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

