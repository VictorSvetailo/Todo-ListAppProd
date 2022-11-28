import {TasksStateType} from '../../../../app/App';
import {TaskStatuses, todoListsAPI, UpdateTaskModelType} from '../../../../api/todoLists-api';
import {AppRootStateType} from '../../../../app/store';
import {addTodoListsTC, fetchTodoListTC, removeTodoListTC} from '../../todoLists-reducer';
import {setAppStatusAC} from '../../../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState: TasksStateType = {};


export const fetchTasksTC = createAsyncThunk('task/fetchTasks', async (toDoListID: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
    const res = await todoListsAPI.getTasks(toDoListID);
    const tasks = res.data.items;
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
    return {toDoListID, tasks}
})

export const removeTaskTC = createAsyncThunk('task/removeTasks', async (param: { toDoListID: string, taskID: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
    const res = await todoListsAPI.deleteTasks(param.toDoListID, param.taskID)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
    return {toDoListID: param.toDoListID, taskID: param.taskID}
})

export const addTaskTC = createAsyncThunk('task/addTask', async (param: { toDoListID: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await todoListsAPI.createTasks(param.toDoListID, param.title)
        if (res.data.resultCode === TaskStatuses.New) {
            dispatch(setAppStatusAC({status: 'succeeded'}));
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (error) {
        //@ts-ignore
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null)
    }
})


export const updateTaskTC = createAsyncThunk('task/updateTask', async (param: { toDoListID: string, taskID: string, model: UpdateDomainTaskModelType }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as AppRootStateType
    const task = state.tasks[param.toDoListID].find((t) => t.id === param.taskID);
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
       const res = await todoListsAPI.updateTask(param.toDoListID, param.taskID, apiModel)
        if (res.data.resultCode === TaskStatuses.New) {
            dispatch(setAppStatusAC({status: 'succeeded'}));
            return param
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (error) {
        //@ts-ignore
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null)
    }
})


const slice = createSlice({
    name: 'todoLists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodoListsTC.fulfilled, (stateDraft, action) => {
            stateDraft[action.payload.todoList.id] = []
        })
        builder.addCase(removeTodoListTC.fulfilled, (stateDraft, action) => {
            delete stateDraft[action.payload.id]
        })
        builder.addCase(fetchTodoListTC.fulfilled, (stateDraft, action) => {
            action.payload.todoLists.forEach((tl: any) => {
                stateDraft[tl.id] = [];
            });
        })
        builder.addCase(fetchTasksTC.fulfilled, (stateDraft, action) => {
            stateDraft[action.payload.toDoListID] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (stateDraft, action) => {
            const index = stateDraft[action.payload.toDoListID].findIndex((t) => t.id === action.payload.taskID);
            if (index > -1) {
                stateDraft[action.payload.toDoListID].splice(index, 1);
            }
        })
        builder.addCase(addTaskTC.fulfilled, (stateDraft, action) => {
            stateDraft[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTaskTC.fulfilled, (stateDraft, action) => {
            const tasks = stateDraft[action.payload.toDoListID]
            const index = tasks.findIndex((t) => t.id === action.payload.taskID);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})


export const tasksReducer = slice.reducer

// thank


// - types -
type UpdateDomainTaskModelType = {
    deadline?: string;
    description?: string;
    priority?: number;
    startDate?: string;
    status?: number;
    title?: string;
};

