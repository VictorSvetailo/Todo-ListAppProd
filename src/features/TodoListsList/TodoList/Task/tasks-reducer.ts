import {TasksStateType} from '../../../../app/App';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setAppStatusAC} from '../../../../app/app-reducer';
import {FieldErrorType, TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from '../../../../api/todoLists-api';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';
import {AxiosError} from 'axios';
import {AppRootStateType} from '../../../../app/store';
import {asyncActions as asyncTodoListsActions} from '../../todoLists-reducer';

const initialState: TasksStateType = {};

export const fetchTasks = createAsyncThunk('task/fetchTasks', async (toDoListID: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
    const res = await todoListsAPI.getTasks(toDoListID);
    const tasks = res.data.items;
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
    return {toDoListID, tasks}
})
export const removeTask = createAsyncThunk('task/removeTasks', async (param: { todoListId: string, taskID: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
    await todoListsAPI.deleteTasks(param.todoListId, param.taskID)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
    return {toDoListID: param.todoListId, taskID: param.taskID}
})
export const addTask = createAsyncThunk<TaskType, { todoListId: string, title: string },
    { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>
('task/addTasks', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await todoListsAPI.createTasks(param.todoListId, param.title)
        if (res.data.resultCode === TaskStatuses.New) {
            dispatch(setAppStatusAC({status: 'succeeded'}));
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const updateTask = createAsyncThunk('task/updateTask', async (param: { todoListId: string, taskID: string, model: UpdateDomainTaskModelType }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as AppRootStateType
    const task = state.tasks[param.todoListId].find((t) => t.id === param.taskID);
    if (!task) {
        return rejectWithValue('task not found in the state')
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        title: task.title,
        ...param.model,
    };
    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await todoListsAPI.updateTask(param.todoListId, param.taskID, apiModel)
        if (res.data.resultCode === TaskStatuses.New) {
            dispatch(setAppStatusAC({status: 'succeeded'}));
            return param
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTask,
    updateTask
}



const slice = createSlice({
    name: 'todoLists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncTodoListsActions.addTodoListsTC.fulfilled, (stateDraft, action) => {
            stateDraft[action.payload.todoList.id] = []
        })
        builder.addCase(asyncTodoListsActions.removeTodoListTC.fulfilled, (stateDraft, action) => {
            delete stateDraft[action.payload.id]
        })
        builder.addCase(asyncTodoListsActions.fetchTodoListTC.fulfilled, (stateDraft, action) => {
            action.payload.todoLists.forEach((tl: any) => {
                stateDraft[tl.id] = [];
            });
        })
        builder.addCase(fetchTasks.fulfilled, (stateDraft, action) => {
            stateDraft[action.payload.toDoListID] = action.payload.tasks
        })
        builder.addCase(removeTask.fulfilled, (stateDraft, action) => {
            const index = stateDraft[action.payload.toDoListID].findIndex((t) => t.id === action.payload.taskID);
            if (index > -1) {
                stateDraft[action.payload.toDoListID].splice(index, 1);
            }
        })
        builder.addCase(addTask.fulfilled, (stateDraft, action) => {
            stateDraft[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTask.fulfilled, (stateDraft, action) => {
            const tasks = stateDraft[action.payload.todoListId]
            const index = tasks.findIndex((t) => t.id === action.payload.taskID);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})


export const tasksReducer = slice.reducer



type UpdateDomainTaskModelType = {
    deadline?: string;
    description?: string;
    priority?: number;
    startDate?: string;
    status?: number;
    title?: string;
};

