import axios from 'axios';
import {GetTaskResponse, LoginParamsType, ResponseType, TaskType, TodoListType, UpdateTaskModelType} from './types';
import {ImageType} from '../features/Photo-gallery/types';
import {GetGalleryType} from './types-gallery';

const settings = {
    withCredentials: true,
    // headers: {
    //     // 'API-KEY': '32233879-a5e5e1e253c0e82bd7e930f04',
    // },
};

const instance = axios.create({
    baseURL: 'https://pixabay.com/api?key=32233879-a5e5e1e253c0e82bd7e930f04',
    // ...settings,
});


export const galleryAPI = {
    getPhoto(currentPage: number, perPage: number, searchByColor: string, searchByLetter: string, searchByCategory: string) {
        console.log(searchByCategory)
        return instance.get<GetGalleryType>(`&q=${searchByColor}+${searchByLetter}&page=${currentPage}&per_page=${perPage}&image_type=all&category=${searchByCategory}`);
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


// export const authAPI = {
//     login(data: LoginParamsType) {
//         return instance.post<ResponseType<{
//             userID?: number;
//         }>>('auth/login', data);
//     },
//     logout() {
//         return instance.delete<ResponseType<{
//             userID?: number;
//         }>>('auth/login');
//     },
//     me() {
//         return instance.get<ResponseType<{
//             id: number;
//             email: string;
//             login: string;
//         }>>('auth/me');
//     },
// };
//
//
