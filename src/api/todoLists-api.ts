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

export const todoListsAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>('todo-lists')
    },
    createTodoLists(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title: title})

    },
    deleteTodoLists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodoLists(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todoListID: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todoListID}/tasks`)
    },
    createTasks(todoListID: string, taskTitle: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todoListID}/tasks`, {title: taskTitle})
    },
    deleteTasks(todoListID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`)
    },
    updateTask(todoListID: string, taskID: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`, model)
    },
}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}


export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

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
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    deadline: string
    description: string
    priority: number
    startDate: string
    status: number
    title: string
}


type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

