import {TasksStateType} from '../../app/App';

import {TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from '../../api/todoLists-api';
import {AppRootStateType} from '../../app/store';
import {addTodoListsAC, removeTodoListAC, setToDoListsAC,} from './todo-lists-reducer';
import {Dispatch} from 'redux';
import {setAppStatusAC} from '../../app/app-reduser';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TasksStateType = {};


const slice = createSlice({
    name: 'todoLists',
    initialState,
    reducers: {
        setTaskAC(stateDraft, action: PayloadAction<{ toDoListID: string, tasks: Array<TaskType> }>) {
            stateDraft[action.payload.toDoListID] = action.payload.tasks
        },
        addTaskAC(stateDraft, action: PayloadAction<{ task: TaskType }>) {
            stateDraft[action.payload.task.todoListId].unshift(action.payload.task)
        },
        removeTaskAC(stateDraft, action: PayloadAction<{ toDoListID: string, taskID: string }>) {
            // stateDraft[action.payload.toDoListID] = state[action.payload.toDoListID].findIndex((t) => t.id !== action.payload.taskID)
            const index = stateDraft[action.payload.toDoListID].findIndex((t) => t.id === action.payload.taskID);
            if (index > -1) {
                stateDraft[action.payload.toDoListID].splice(index, 1);
            }
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
    }
// {
//     [addTodoListsAC.type]: (stateDraft, action: PayloadAction<{ todoList: TodoListType }>)=> {},
//     [removeTodoListAC.type]: (stateDraft, action: PayloadAction<{ toDoListID: string }>)=> {},
//     [setToDoListsAC.type]: (stateDraft, action: PayloadAction<{ todoLists: TodoListType[] }>)=> {},
// }
})


export const tasksReducer = slice.reducer
export const {setTaskAC, addTaskAC, removeTaskAC, updateTaskAC} = slice.actions;

// thank
export const fetchTasksTC = (toDoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todoListsAPI.getTasks(toDoListID).then((res) => {
        const tasks = res.data.items;
        const action = setTaskAC({toDoListID, tasks});
        dispatch(action);
        dispatch(setAppStatusAC({status: 'succeeded'}));
    });
};
export const addTaskTC = (toDoListID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todoListsAPI
        .createTasks(toDoListID, title)
        .then((res) => {
            if (res.data.resultCode === TaskStatuses.New) {
                const task = res.data.data.item;
                dispatch(addTaskAC({task}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};
export const removeTaskTC = (toDoListID: string, taskID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todoListsAPI.deleteTasks(toDoListID, taskID).then((res) => {
        dispatch(removeTaskAC({toDoListID, taskID}));
        dispatch(setAppStatusAC({status: 'succeeded'}));
    });
};
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

