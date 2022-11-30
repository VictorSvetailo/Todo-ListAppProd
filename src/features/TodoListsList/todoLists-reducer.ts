import {FieldErrorType, TaskType, todoListsAPI, TodoListType} from '../../api/todoLists-api';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {ThunkError} from '../../app/store';

export const fetchTodoListTC = createAsyncThunk('todoLists/fetchTodoList', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await todoListsAPI.getTodoLists();
        dispatch(setAppStatusAC({status: 'succeeded'}));
        return {todoLists: res.data}
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const addTodoListsTC = createAsyncThunk<{todoList: TodoListType }, string, ThunkError>
('todoLists/addTodoLists', async (title, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await todoListsAPI.createTodoLists(title);
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}));
            return {todoList: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch, false);
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, dispatch, false)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const removeTodoListTC = createAsyncThunk('todoLists/removeTodoList', async (toDoListID: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    dispatch(changeTodolistEntityStatus({id: toDoListID, status: 'loading'}));
    const res = await todoListsAPI.deleteTodoLists(toDoListID)
    dispatch(setAppStatusAC({status: 'succeeded'}));
    return {id: toDoListID}
})
export const changeTodoListTitleTC = createAsyncThunk('todoLists/changeTodoListTitle', async (
    param: { toDoListID: string, title: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    await todoListsAPI.updateTodoLists(param.toDoListID, param.title)
    dispatch(setAppStatusAC({status: 'succeeded'}));
    return {toDoListID: param.toDoListID, title: param.title}
})


export const asyncActions = {
    fetchTodoListTC,
    addTodoListsTC,
    removeTodoListTC,
    changeTodoListTitleTC,
}


export const slice = createSlice({
    name: 'todoLists',
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        changeTodolistFilter(stateDraft, action: PayloadAction<{ id: string; filter: FilterValuesType }>) {
            const index = stateDraft.findIndex((tl) => tl.id === action.payload.id);
            stateDraft[index].filter = action.payload.filter;
        },
        changeTodolistEntityStatus(stateDraft, action: PayloadAction<{ id: string; status: RequestStatusType }>) {
            const index = stateDraft.findIndex((tl) => tl.id === action.payload.id);
            stateDraft[index].entityStatus = action.payload.status;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoListTC.fulfilled, (state, action) => {
            return action.payload.todoLists.map((el) => ({...el, filter: 'all', entityStatus: 'idle',}));
        })
        builder.addCase(addTodoListsTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'});
        })
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            const index = state.findIndex((tl) => tl.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
            }
        })
        builder.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex((tl) => tl.id === action.payload.toDoListID);
            state[index].title = action.payload.title;

        })
    }
});

export const todoListsReducer = slice.reducer;
export const {
    changeTodolistFilter,
    changeTodolistEntityStatus,
} = slice.actions;


// - types -
export type FilterValuesType = 'all' | 'completed' | 'active';
// export type ThunkDispatch = Dispatch<AppActionsType | SetAppStatusAT | SetAppErrorAT>;

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
};
