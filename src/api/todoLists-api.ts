import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'c6150b07-be78-48c2-be1a-83b0f879593c'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    data: D
}


export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}


export const todoListsAPI = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>('todo-lists')
    },
    createTodoLists(title: string) {
        return instance.post<ResponseType<{item: TodoListType}>>('todo-lists', {title: title})
    },
    deleteTodoLists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodoLists(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todoListID: string){
        return instance.get<GetTaskResponse>(`todo-lists/${todoListID}/tasks`)
    },
    createTasks(todoListID: string, title: string) {
        return instance.post(`todo-lists/${todoListID}/tasks`, {title: title})
    },
    deleteTasks(todoListID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`)
    },
    // updateTasks(todoListID: string, taskID: string, model: UpdateTaskModelType) {
    //     return instance.delete<UpdateTaskModelType>(`todo-lists/${todoListID}/tasks/${taskID}`)
    // },
}