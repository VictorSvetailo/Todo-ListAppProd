import {TasksStateType} from '../../../../app/App';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {appActions} from '../../../CommanActions/AppActions';
import {todoListsAPI} from '../../../../api/todoLists-api';
import {
    handleAsyncServerNetworkError, handleAsyncServerAppError
} from '../../../../utils/error-utils';
import {AxiosError} from 'axios';
import {asyncActions as asyncTodoListsActions} from '../../todoLists-reducer';
import {AppRootStateType, ThunkError} from '../../../../app/store';
import {TaskStatuses, TaskType, UpdateTaskModelType} from '../../../../api/types';

const initialState: TasksStateType = {};


const {setAppStatus} = appActions

export const fetchTasks = createAsyncThunk<{ toDoListID: string, tasks: TaskType[] }, string, ThunkError>('task/fetchTasks', async (toDoListID, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await todoListsAPI.getTasks(toDoListID);
        const tasks = res.data.items;
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
        return {toDoListID, tasks}
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(error, thunkAPI)
    }

})
export const removeTask = createAsyncThunk<{ toDoListID: string, taskID: string }, { todoListId: string, taskID: string }, ThunkError>('task/removeTasks', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    await todoListsAPI.deleteTasks(param.todoListId, param.taskID)
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
    return {toDoListID: param.todoListId, taskID: param.taskID}
})
export const addTask = createAsyncThunk<TaskType, { todoListId: string, title: string }, ThunkError>
('task/addTasks', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await todoListsAPI.createTasks(param.todoListId, param.title)
        if (res.data.resultCode === TaskStatuses.New) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return res.data.data.item
        } else {
            handleAsyncServerAppError(res.data, thunkAPI, false);
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const updateTask = createAsyncThunk('task/updateTask', async (param: { todoListId: string, taskID: string, model: UpdateDomainTaskModelType }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType
    const task = state.tasks[param.todoListId].find((t) => t.id === param.taskID);
    if (!task) {
        return thunkAPI.rejectWithValue('task not found in the state')
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
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await todoListsAPI.updateTask(param.todoListId, param.taskID, apiModel)
        if (res.data.resultCode === TaskStatuses.New) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return param
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTask,
    updateTask
}


export const slice = createSlice({
    name: 'todoLists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncTodoListsActions.addTodoListsTC.fulfilled, (stateDraft, action) => {
                stateDraft[action.payload.todoList.id] = []
            })
            .addCase(asyncTodoListsActions.removeTodoListTC.fulfilled, (stateDraft, action) => {
                delete stateDraft[action.payload.id]
            })
            .addCase(asyncTodoListsActions.fetchTodoListTC.fulfilled, (stateDraft, action) => {
                action.payload.todoLists.forEach((tl: any) => {
                    stateDraft[tl.id] = [];
                });
            })
            .addCase(fetchTasks.fulfilled, (stateDraft, action) => {
                stateDraft[action.payload.toDoListID] = action.payload.tasks
            })
            .addCase(removeTask.fulfilled, (stateDraft, action) => {
                const index = stateDraft[action.payload.toDoListID].findIndex((t) => t.id === action.payload.taskID);
                if (index > -1) {
                    stateDraft[action.payload.toDoListID].splice(index, 1);
                }
            })
            .addCase(addTask.fulfilled, (stateDraft, action) => {
                stateDraft[action.payload.todoListId].unshift(action.payload)
            })
            .addCase(updateTask.fulfilled, (stateDraft, action) => {
                const tasks = stateDraft[action.payload.todoListId]
                const index = tasks.findIndex((t) => t.id === action.payload.taskID);
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            })
    }
})


type UpdateDomainTaskModelType = {
    deadline?: string;
    description?: string;
    priority?: number;
    startDate?: string;
    status?: number;
    title?: string;
};

