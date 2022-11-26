import {TasksStateType} from '../../../../app/App';

import {TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from '../../../../api/todoLists-api';
import {AppRootStateType} from '../../../../app/store';
import {addTodoListsAC, removeTodoListAC, setToDoListsAC,} from '../../todoLists-reducer';
import {Dispatch} from 'redux';
import {setAppStatusAC} from '../../../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

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


const slice = createSlice({
    name: 'todoLists',
    initialState,
    reducers: {
        addTaskAC(stateDraft, action: PayloadAction<TaskType>) {
            stateDraft[action.payload.todoListId].unshift(action.payload)
        },
        updateTaskAC(stateDraft, action: PayloadAction<{ toDoListID: string, taskID: string, model: UpdateDomainTaskModelType }>) {
            const tasks = stateDraft[action.payload.toDoListID]
            const index = tasks.findIndex((t) => t.id === action.payload.taskID);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListsAC, (stateDraft, action) => {
            stateDraft[action.payload.todoList.id] = []
        })
        builder.addCase(removeTodoListAC, (stateDraft, action) => {
            delete stateDraft[action.payload.toDoListID]
        })
        builder.addCase(setToDoListsAC, (stateDraft, action) => {
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
    }
// {
//     [addTodoListsAC.type]: (stateDraft, action: PayloadAction<{ todoList: TodoListType }>)=> {},
//     [removeTodoListAC.type]: (stateDraft, action: PayloadAction<{ toDoListID: string }>)=> {},
//     [setToDoListsAC.type]: (stateDraft, action: PayloadAction<{ todoLists: TodoListType[] }>)=> {},
// }
})


export const tasksReducer = slice.reducer
export const {addTaskAC, updateTaskAC} = slice.actions;

// thank

export const addTaskTC = (toDoListID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todoListsAPI
        .createTasks(toDoListID, title)
        .then((res) => {
            if (res.data.resultCode === TaskStatuses.New) {
                const task = res.data.data.item;
                dispatch(addTaskAC(task));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};
// export const removeTaskTC = (toDoListID: string, taskID: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}));
//     todoListsAPI.deleteTasks(toDoListID, taskID).then((res) => {
//         dispatch(removeTaskAC({todoListID: toDoListID, taskID}));
//         dispatch(setAppStatusAC({status: 'succeeded'}));
//     });
// };
export const updateTaskTC = (toDoListID: string, taskID: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[toDoListID].find((t) => t.id === taskID);
    if (!task) {
        console.log('task not found in the state');
        return;
    }
    const model: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        title: task.title,
        ...domainModel,
    };
    dispatch(setAppStatusAC({status: 'loading'}));
    todoListsAPI
        .updateTask(toDoListID, taskID, model)
        .then((res) => {
            if (res.data.resultCode === TaskStatuses.New) {
                dispatch(updateTaskAC({toDoListID, taskID, model}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};

// - types -
type UpdateDomainTaskModelType = {
    deadline?: string;
    description?: string;
    priority?: number;
    startDate?: string;
    status?: number;
    title?: string;
};
