import axios from 'axios';
import {GetTaskResponse, ResponseType, TaskType, TodoListType, UpdateTaskModelType} from './types';
import {ProfileItemsType} from '../BLL/social-network-reducer';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'c6150b07-be78-48c2-be1a-83b0f879593c',
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
};

const instance = axios.create(settings);

// api
export const socialNetworkAPI = {
    getUsers() {
        return instance.get<Array<any>>('users');
    },
    getProfile(userId: number | null) {
        return instance.get<ProfileItemsType>(`profile/${userId}`);
    },
    // createTodoLists(title: string) {
    //     return instance.post<ResponseType<{
    //         item: TodoListType;
    //     }>>('todo-lists', {title: title});
    // },
    // deleteTodoLists(id: string) {
    //     return instance.delete<ResponseType>(`todo-lists/${id}`);
    // },
    // updateTodoLists(id: string, title: string) {
    //     return instance.put<ResponseType>(`todo-lists/${id}`, {title: title,});
    // },
    // updateReorderTodoLists(toDoListID1: string, putAfterItemId: string) {
    //     console.log(toDoListID1, putAfterItemId)
    //     return instance.put<ResponseType>(`todo-lists/${toDoListID1}/reorder`, {putAfterItemId});
    // },
    // getTasks(todoListID: string) {
    //     return instance.get<GetTaskResponse>(`todo-lists/${todoListID}/tasks`);
    // },
    // createTasks(todoListID: string, taskTitle: string) {
    //     return instance.post<ResponseType<{
    //         item: TaskType;
    //     }>>(`todo-lists/${todoListID}/tasks`, {
    //         title: taskTitle,
    //     });
    // },
    // deleteTasks(todoListID: string, taskID: string) {
    //     return instance.delete<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`);
    // },
    // updateTask(todoListID: string, taskID: string, model: UpdateTaskModelType) {
    //     return instance.put<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`, model);
    // },
};