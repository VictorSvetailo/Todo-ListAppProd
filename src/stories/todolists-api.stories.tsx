import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todoListsAPI, UpdateTaskModelType} from '../api/todoLists-api';
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
        const id = 'b237b6a0-0d7e-4ebe-8673-4d7365fb6b61'
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
            <button onClick={getTaskHandler}>Create task</button>
        </div>
    </div>
}


export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoListID, setTodolistID] = useState<string>('')
    const [title, setNewTaskTitle] = useState<string>('')
    const createTaskHandler = () => {
        todoListsAPI.createTasks(todoListID, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todoListID} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <input placeholder={'NewTitle'} value={title} onChange={(e) => {
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


// export const UpdateTasks = () => {
//     const [state, setState] = useState<any>(null)
//     const [todoListID, setTodolistID] = useState<string>('')
//     const [taskID, setTaskID] = useState<string>('')
//     const [title, setNewTitle] = useState<UpdateTaskModelType>()
//     const updateTaskHandler = () => {
//         todoListsAPI.updateTasks(todoListID, taskID, title)
//             .then((res) => {
//                 setState(res.data.title)
//             })
//     }
//     return <div>{JSON.stringify(state)}
//         <input placeholder={'todolistID'} value={todoListID} onChange={(e) => {
//             setTodolistID(e.currentTarget.value)
//         }}/>
//         <input placeholder={'taskID'} value={taskID} onChange={(e) => {
//             setTaskID(e.currentTarget.value)
//         }}/>
//         <input placeholder={'NewTitle'} value={taskID} onChange={(e) => {
//             setTaskID(e.currentTarget.value)
//         }}/>
//         <button onClick={updateTaskHandler}>Update task</button>
//     </div>
// }



