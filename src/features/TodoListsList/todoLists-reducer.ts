import { todoListsAPI } from '../../api/todoLists-api'
import { RequestStatusType } from '../Apllication'
import { appActions } from '../CommanActions/AppActions'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError
} from '../../utils/error-utils'
import { TodoListType } from '../../api/types'
import { ThunkError } from '../../app/store'

const { setAppStatus } = appActions

export const fetchTodoListTC = createAsyncThunk<
    { todoLists: TodoListType[] },
    undefined,
    ThunkError
>('todoLists/fetchTodoList', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
    try {
        const res = await todoListsAPI.getTodoLists()
        thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
        return { todoLists: res.data }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const addTodoListsTC = createAsyncThunk<
    { todoList: TodoListType },
    string,
    ThunkError
>('todoLists/addTodoLists', async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
    try {
        const res = await todoListsAPI.createTodoLists(title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
            return { todoList: res.data.data.item }
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
})

export const removeTodoListTC = createAsyncThunk<
    { id: string },
    string,
    ThunkError
>(
    'todoLists/removeTodoList',
    async (toDoListID, { dispatch, rejectWithValue }) => {
        dispatch(setAppStatus({ status: 'loading' }))
        dispatch(
            changeTodolistEntityStatus({ id: toDoListID, status: 'loading' })
        )
        const res = await todoListsAPI.deleteTodoLists(toDoListID)
        dispatch(setAppStatus({ status: 'succeeded' }))
        return { id: toDoListID }
    }
)
export const changeTodoListTitleTC = createAsyncThunk(
    'todoLists/changeTodoListTitle',
    async (param: { toDoListID: string; title: string }, thunkAPI) => {
        try {
            const res = await todoListsAPI.updateTodoLists(
                param.toDoListID,
                param.title
            )
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
                return { toDoListID: param.toDoListID, title: param.title }
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (err) {
            const error = err as AxiosError
            return handleAsyncServerNetworkError(error, thunkAPI, false)
        }
    }
)

export const changeTodoListOrderTC = createAsyncThunk(
    'todoLists/changeTodoListOrder',
    async (param: { toDoListID: string; newOrder: string }, thunkAPI) => {
        console.log('changeTodoListOrder')
        try {
            const res = await todoListsAPI.updateReorderTodoLists(
                param.toDoListID,
                param.newOrder
            )
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
                return { toDoListID: param.toDoListID, newOrder: param.newOrder }
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (err) {
            const error = err as AxiosError
            return handleAsyncServerNetworkError(error, thunkAPI, false)
        }
    }
)

export const asyncActions = {
    fetchTodoListTC,
    addTodoListsTC,
    removeTodoListTC,
    changeTodoListTitleTC,
    changeTodoListOrderTC
}

export const slice = createSlice({
    name: 'todoLists',
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        changeTodolistFilter(
            stateDraft,
            action: PayloadAction<{ id: string; filter: FilterValuesType }>
        ) {
            const index = stateDraft.findIndex(
                (tl) => tl.id === action.payload.id
            )
            stateDraft[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus(
            stateDraft,
            action: PayloadAction<{ id: string; status: RequestStatusType }>
        ) {
            const index = stateDraft.findIndex(
                (tl) => tl.id === action.payload.id
            )
            stateDraft[index].entityStatus = action.payload.status
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodoListTC.fulfilled, (state, action) => {
                return action.payload.todoLists.map((el) => ({
                    ...el,
                    filter: 'all',
                    entityStatus: 'idle'
                }))
            })
            .addCase(addTodoListsTC.fulfilled, (state, action) => {
                state.unshift({
                    ...action.payload.todoList,
                    filter: 'all',
                    entityStatus: 'idle'
                })
            })
            .addCase(removeTodoListTC.fulfilled, (state, action) => {
                const index = state.findIndex(
                    (tl) => tl.id === action.payload.id
                )
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(
                    (tl) => tl.id === action.payload.toDoListID
                )
                state[index].title = action.payload.title
            })
            .addCase(changeTodoListOrderTC.fulfilled, (state, action) => {
                console.log('hello')
            })
    }
})

export const { changeTodolistFilter, changeTodolistEntityStatus } =
    slice.actions

// - types -
export type FilterValuesType = 'all' | 'completed' | 'active'
// export type ThunkDispatch = Dispatch<AppActionsType | SetAppStatusAT | SetAppErrorAT>;

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
