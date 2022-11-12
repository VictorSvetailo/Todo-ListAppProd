import { TasksStateType } from "../../app/App";

import { TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType } from "../../api/todoLists-api";
import { AppActionsType, AppRootStateType } from "../../app/store";
import { AddTodoListActionType, RemoveTodoListActionType, SetTodoListActionType } from "./todolists-reducer";
import { Dispatch } from "redux";
import { setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT } from "../../app/app-reduser";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
   switch (action.type) {
      case "SET_TODOLISTS": {
         let copyState = {
            ...state,
         };
         action.todoLists.forEach((tl) => {
            copyState[tl.id] = [];
         });
         return copyState;
      }
      case "SET_TASKS": {
         return {
            ...state,
            [action.toDoListID]: action.tasks,
         };
      }
      case "REMOVE-TASK":
         return {
            ...state,
            [action.toDoListID]: state[action.toDoListID].filter((t) => t.id !== action.taskID),
         };
      case "ADD-TASK": {
         // const stateCopy = {...state}
         // const newTask = action.task
         // const tasks = stateCopy[newTask.todoListId]
         // const newTasks = [newTask, ...tasks]
         // stateCopy[newTask.todoListId] = newTasks
         // return stateCopy
         return {
            ...state,
            [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
         };
      }
      case "UPDATE-TASK":
         return {
            ...state,
            [action.toDoListID]: state[action.toDoListID].map((t) =>
               t.id !== action.taskID
                  ? t
                  : {
                       ...t,
                       ...action.model,
                    }
            ),
         };
      case "ADD-TODOLIST":
         return {
            ...state,
            [action.todoList.id]: [],
         };
      case "REMOVE-TODOLIST":
         const copyState = {
            ...state,
         };
         delete copyState[action.id];
         return copyState;
      default:
         return state;
   }
};

// actions
export const removeTaskAC = (toDoListID: string, taskID: string) =>
   ({
      type: "REMOVE-TASK",
      toDoListID,
      taskID,
   } as const);
export const addTaskAC = (task: TaskType) =>
   ({
      type: "ADD-TASK",
      task,
   } as const);
export const updateTaskAC = (toDoListID: string, taskID: string, model: UpdateDomainTaskModelType) =>
   ({
      type: "UPDATE-TASK",
      toDoListID,
      taskID,
      model,
   } as const);
export const changeTaskTitleAC = (toDoListID: string, taskID: string, title: string) =>
   ({
      type: "CHANGE-TASK-TITLE",
      toDoListID,
      taskID,
      title,
   } as const);
export const setTaskAC = (toDoListID: string, tasks: Array<TaskType>) =>
   ({
      type: "SET_TASKS",
      toDoListID,
      tasks,
   } as const);

// thank
export const fetchTasksTC = (todoListID: string) => (dispatch: Dispatch<TasksActionType | SetAppStatusAT>) => {
   dispatch(setAppStatusAC("loading"));
   todoListsAPI.getTasks(todoListID).then((res) => {
      const tasks = res.data.items;
      const action = setTaskAC(todoListID, tasks);
      dispatch(action);
      dispatch(setAppStatusAC("succeeded"));
   });
};
export const addTaskTC = (toDoListID: string, title: string) => (dispatch: Dispatch<TasksActionType | SetAppErrorAT | SetAppStatusAT>) => {
   dispatch(setAppStatusAC("loading"));
   todoListsAPI
      .createTasks(toDoListID, title)
      .then((res) => {
         if (res.data.resultCode === TaskStatuses.New) {
            const task = res.data.data.item;
            dispatch(addTaskAC(task));
            dispatch(setAppStatusAC("succeeded"));
         } else {
            handleServerAppError(res.data, dispatch);
         }
      })
      .catch((error) => {
         handleServerNetworkError(error, dispatch);
      });
};
export const removeTaskTC = (toDoListID: string, taskID: string) => (dispatch: Dispatch<TasksActionType | SetAppErrorAT | SetAppStatusAT>) => {
   dispatch(setAppStatusAC("loading"));
   todoListsAPI.deleteTasks(toDoListID, taskID).then((res) => {
      dispatch(removeTaskAC(toDoListID, taskID));
      dispatch(setAppStatusAC("succeeded"));
   });
};
export const updateTaskTC = (toDoListID: string, taskID: string, domainModel: UpdateDomainTaskModelType) => (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
   const state = getState();
   const task = state.tasks[toDoListID].find((t) => t.id === taskID);
   if (!task) {
      console.log("task not found in the state");
      return;
   }
   const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      status: task.status,
      title: task.title,
      ...domainModel,
   };
   dispatch(setAppStatusAC("loading"));
   todoListsAPI
      .updateTask(toDoListID, taskID, apiModel)
      .then((res) => {
         if (res.data.resultCode === TaskStatuses.New) {
            dispatch(updateTaskAC(toDoListID, taskID, apiModel));
            dispatch(setAppStatusAC("succeeded"));
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

export type TasksActionType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC> | ReturnType<typeof updateTaskAC> | ReturnType<typeof changeTaskTitleAC> | ReturnType<typeof setTaskAC> | RemoveTodoListActionType | SetTodoListActionType | AddTodoListActionType;

const initialState: TasksStateType = {};
export type ThunkDispatch = Dispatch<AppActionsType | SetAppStatusAT | SetAppErrorAT>;
