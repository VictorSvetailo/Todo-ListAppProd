import React, {useEffect, useLayoutEffect, useState} from 'react'
import {todoListsAPI, UpdateTaskModelType} from './todoLists-api';
import {string} from 'prop-types';

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'c6150b07-be78-48c2-be1a-83b0f879593c'
    }
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывая в state
        // который в виде строки будем отображать в div
        //эта конструкция превращается в promise
        todoListsAPI.getTodoLists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывая в state
        // который в виде строки будем отображать в div
        todoListsAPI.createTodoLists('dscsdcs')
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывая в state
        // который в виде строки будем отображать в div
        const id = '402ec8d1-eaee-4261-9437-2e9aead549ba'
        todoListsAPI.deleteTodoLists(id)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывая в state
        // который в виде строки будем отображать в div
        const id = '852cd269-c594-40bd-9419-13e675ae9ca6'
        todoListsAPI.updateTodoLists(id, 'Vagner Svetailo')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoListID, setTodolistID] = useState<string>('')
    const getTaskHandler = () => {
        todoListsAPI.getTasks(todoListID)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todoListID} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <button onClick={getTaskHandler}>Get task</button>
        </div>
    </div>
}


export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoListID, setTodolistID] = useState<string>('')
    const [taskTitle, setNewTaskTitle] = useState<string>('')

    const createTaskHandler = () => {
        todoListsAPI.createTasks(todoListID, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todoListID} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <input placeholder={'NewTitle'} value={taskTitle} onChange={(e) => {
                setNewTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTaskHandler}>Create task</button>
        </div>
    </div>
}


export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoListID, setTodolistID] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')
    const deleteTaskHandler = () => {
        todoListsAPI.deleteTasks(todoListID, taskID)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todoListID} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <input placeholder={'taskID'} value={taskID} onChange={(e) => {
                setTaskID(e.currentTarget.value)
            }}/>
            <button onClick={deleteTaskHandler}>Delete task</button>
        </div>
    </div>
}


export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoListID, setTodolistID] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')

    const [title, setTitle] = useState<string>('title 1')
    const [description, setDescription] = useState<string>('description 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const updateTaskHandler = () => {
        todoListsAPI.updateTask(todoListID, taskID, {
            deadline: '',
            description: description,
            priority: priority,
            startDate: '',
            status: status,
            title: title,
        })
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todoListID} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <input placeholder={'taskID'} value={taskID} onChange={(e) => {
                setTaskID(e.currentTarget.value)
            }}/>
            <input placeholder={'Title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <input placeholder={'Description'} value={description} onChange={(e) => {
                setDescription(e.currentTarget.value)
            }}/>
            <input placeholder={'Status'} value={status} type="number" onChange={(e) => {
                setStatus(+e.currentTarget.value)
            }}/>
            <input placeholder={'priority'} value={priority} type="number" onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }}/>
        </div>
        <button onClick={updateTaskHandler}>Update task</button>
    </div>
}