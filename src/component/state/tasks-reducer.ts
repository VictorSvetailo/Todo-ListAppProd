import {TasksStateType} from '../../App';
import {
    AddTodolistActionType,
    RemoveTodolistActionType, setToDoListsAC,
} from './todolists-reducer';

import {
    TaskType,
    todoListsAPI,
    TodoListType, UpdateTaskModelType,
} from '../../api/todoLists-api';
import {AppRootStateType} from './store';


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'SET_TODOLISTS': {
            let copyState = {...state}
            action.todoLists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET_TASKS': {
            let copyState = {...state}
            copyState[action.toDoListID] = action.tasks
            return copyState
        }
        case 'REMOVE-TASK':
            return {...state, [action.toDoListID]: state[action.toDoListID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
        }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(t => t.id !== action.taskID ? t : {
                    ...t,
                    ...action.model
                })
            }
        case 'ADD-TODOLIST':
            const stateCopy = {...state}
            stateCopy[action.todoList.id] = []
            return stateCopy
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;
        }

        default:
            return state

    }
}

export const removeTaskAC = (toDoListID: string, taskID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', toDoListID, taskID}
}

export const addTaskAC = (task: TaskType): AdTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const updateTaskAC = (toDoListID: string, taskID: string, model: UpdateDomainTaskModelType): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', toDoListID, taskID, model}
}

export const changeTaskTitleAC = (toDoListID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', toDoListID, taskID, title}
}

export const setTaskAC = (toDoListID: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {type: 'SET_TASKS', toDoListID, tasks}
}


export const fetchTasksTC = (todoListID: string) => {
    return (dispatch: any) => {
        todoListsAPI.getTasks(todoListID)
            .then((res) => {
                const tasks = res.data.items
                const action = setTaskAC(todoListID, tasks)
                dispatch(action)
            })
    }
}

export const addTaskTC = (toDoListID: string, title: string) => {
    return (dispatch: any) => {
        todoListsAPI.createTasks(toDoListID, title)
            .then(res => {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
            })
    }
}


export const removeTaskTC = (toDoListID: string, taskID: string) => {
    return (dispatch: any) => {
        todoListsAPI.deleteTasks(toDoListID, taskID)
            .then(res => {
                dispatch(removeTaskAC(toDoListID, taskID))
            })
    }
}

// export const changeTaskTitleTC = (toDoListID: string, taskID: string, title: any) => {
//     return (dispatch: any, getState: () => AppRootStateType) => {
//         const state = getState()
//         const task = state.tasks[toDoListID].find(t => t.id === taskID)
//         if (!task){
//             console.log('task not found in the state')
//             return
//         }
//         const model: UpdateTaskModelType = {
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             startDate: task.startDate,
//             status: task.status,
//             title: title,
//         }
//         todoListsAPI.updateTask(toDoListID, taskID, model)
//             .then(res => {
//                 dispatch(changeTaskTitleAC(toDoListID, taskID, title))
//             })
//     }
// }

type UpdateDomainTaskModelType = {
    deadline?: string
    description?: string
    priority?: number
    startDate?: string
    status?: number
    title?: string
}

export const updateTaskTC = (toDoListID: string, taskID: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: any, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[toDoListID].find(t => t.id === taskID)
        if (!task){
            console.log('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status,
                title: task.title,
            ...domainModel
        }
        todoListsAPI.updateTask(toDoListID, taskID, apiModel)
            .then(res => {
                dispatch(updateTaskAC(toDoListID, taskID, domainModel))
            })
    }
}


// Type

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    toDoListID: string
    taskID: string
}
export type AdTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    toDoListID: string
    taskID: string
    model: UpdateDomainTaskModelType
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    toDoListID: string
    taskID: string
    title: string
}


type ActionType = RemoveTaskActionType
    | AdTaskActionType
    | UpdateTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

type SetTodoListActionType = {
    type: 'SET_TODOLISTS'
    todoLists: TodoListType[]
}

type SetTasksActionType = {
    type: 'SET_TASKS'
    tasks: Array<TaskType>
    toDoListID: string
}