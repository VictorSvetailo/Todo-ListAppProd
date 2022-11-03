import {TasksStateType} from '../../App';
import {
    AddTodolistActionType,
    RemoveTodolistActionType, setToDoListsAC,
} from './todolists-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses, TaskType, todoListsAPI, TodoListType} from '../../api/todoLists-api';



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
        case 'ADD-TASK':
            return {
                ...state,
                [action.toDoListID]:
                    [...state[action.toDoListID],
                        {
                            id: v1(),
                            title: action.title,
                            status: TaskStatuses.New,
                            todoListId: action.toDoListID,
                            addedDate: '',
                            deadline: '',
                            order: 0,
                            description: '',
                            priority: TaskPriorities.Low,
                            startDate: ''
                        }]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(t => t.id !== action.taskID ? t : {
                    ...t,
                    status: action.status
                })
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(t => t.id !== action.taskID ? t : {
                    ...t,
                    title: action.title
                })
            }
        case 'ADD-TODOLIST':
            const stateCopy = {...state}
            stateCopy[action.toDoListID] = []
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

export const addTaskAC = (toDoListID: string, title: string): AdTaskActionType => {
    return {type: 'ADD-TASK', toDoListID: toDoListID, title: title, status: TaskStatuses.New}
}

export const changeTaskStatusAC = (toDoListID: string, taskID: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', toDoListID, taskID, status}
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


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    toDoListID: string
    taskID: string
}
export type AdTaskActionType = {
    type: 'ADD-TASK'
    toDoListID: string
    title: string
    status: TaskStatuses;
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    toDoListID: string
    taskID: string
    status: TaskStatuses;
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    toDoListID: string
    taskID: string
    title: string
}


type ActionType = RemoveTaskActionType
    | AdTaskActionType
    | ChangeTaskStatusActionType
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