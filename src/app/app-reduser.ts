import {TodoListType} from '../api/todoLists-api';


export const initialState: InitialStateType = {
    status: 'idle' as RequestStatusType,
    error: null,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET_STATUS', status}) as const

export const setErrorAC = (error: string | null) =>
    ({type: 'APP/SET_ERROR', error}) as const


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType,
    error: string | null
}


export type SetErrorAT = ReturnType<typeof setErrorAC>
export type SetStatusAT = ReturnType<typeof setStatusAC>
type ActionsType =
    | SetStatusAT
    | SetErrorAT