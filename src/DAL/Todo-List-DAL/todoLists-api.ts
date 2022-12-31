import axios from 'axios';
import {GetTaskResponse, LoginParamsType, ResponseType, TaskType, TodoListType, UpdateTaskModelType} from './types';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'c6150b07-be78-48c2-be1a-83b0f879593c',
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
};

const instance = axios.create(settings);

// DAL
export const todoListsAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>('todo-lists');
    },
    createTodoLists(title: string) {
        return instance.post<ResponseType<{
            item: TodoListType;
        }>>('todo-lists', {title: title});
    },
    deleteTodoLists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodoLists(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title,});
    },
    updateReorderTodoLists(toDoListID1: string, putAfterItemId: string) {
        console.log(toDoListID1, putAfterItemId)
        return instance.put<ResponseType>(`todo-lists/${toDoListID1}/reorder`, {putAfterItemId});
    },
    getTasks(todoListID: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todoListID}/tasks`);
    },
    createTasks(todoListID: string, taskTitle: string) {
        return instance.post<ResponseType<{
            item: TaskType;
        }>>(`todo-lists/${todoListID}/tasks`, {
            title: taskTitle,
        });
    },
    deleteTasks(todoListID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`);
    },
    updateTask(todoListID: string, taskID: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`, model);
    },
};


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{
            userID?: number;
        }>>('auth/login', data);
    },
    logout() {
        return instance.delete<ResponseType<{
            userID?: number;
        }>>('auth/login');
    },
    me() {
        return instance.get<ResponseType<{
            id: number;
            email: string;
            login: string;
        }>>('auth/me');
    },
};


