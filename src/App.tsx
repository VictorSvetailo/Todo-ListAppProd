import React, {useState} from 'react';
import stales from './App.module.css';
import {TaskType, ToDoList} from './component/ToDoList/ToDoList';
import {v1} from 'uuid';
import AddItemForm from './component/AddItemForm/AddItemForm';

export type FilterValuesType = 'all' | 'completed' | 'active';

type ToDoListType = {
    title: string
    filter: FilterValuesType
    id: string
}

type TaskStateType = {
    [toDoList_ID: string]: Array<TaskType>
}

function App() {
    const toDoListID_1 = v1()
    const toDoListID_2 = v1()
    const toDoListID_3 = v1()
    // Array toDoList
    const [toDoList, setTodolist] = useState<Array<ToDoListType>>([
        {id: toDoListID_1, title: 'What to learn?', filter: 'all'},
        {id: toDoListID_2, title: 'What to buy?', filter: 'all'},
        {id: toDoListID_3, title: 'What to buy?', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [toDoListID_1]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS ', isDone: false},
            {id: v1(), title: 'JS/TS ', isDone: false},
        ],
        [toDoListID_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Apple', isDone: false},
        ],
        [toDoListID_3]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Apple', isDone: false},
        ]
    })
    // Add Tasks
    const addTask = (title: string, toDoListID: string) => {
        setTasks({
            ...tasks,
            [toDoListID]: [
                {id: v1(), title, isDone: false},
                ...tasks[toDoListID]
            ]
        })
        //setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }
    //--//
    // Remove--------------------------------------------------
    const removeTask = (taskID: string, toDoListID: string) => {
        // короткий способ создать логику
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].filter(task => task.id !== taskID)})
        // 1) создаем новый объект {...tasks}
        // 2)
        //длинный код
        // const copyTasks = {...tasks}
        // copyTasks[toDoListID] = copyTasks[toDoListID].filter(task => task.id !== taskID)
        // setTasks(copyTasks)
    }
    //--//
    // Filter--------------------------------------------------
    let [filter, setFilter] = useState<FilterValuesType>('all');

    function changeToDoListFilter(filter: FilterValuesType, toDoListID: string) {
        setTodolist(toDoList.map(tl => tl.id !== toDoListID ? tl : {...tl, filter: filter}))

        // setFilter(value);
    }

    //--//
    // Add New Tasks
    const onClickAddTaskHandler = () => {
        console.log('Add-New Task')
    }

    // Change status
    const changeTaskStatus = (taskId: string, isDone: boolean, toDoListID: string) => {
        setTasks(
            {
                ...tasks,
                [toDoListID]: tasks[toDoListID].map(t => t.id !== taskId ? t : {...t, isDone})
            })
    }
    const changeTaskTitle = (taskId: string, title: string, toDoListID: string) => {
        setTasks({...tasks,
                [toDoListID]: tasks[toDoListID].map(t => t.id !== taskId ? t : {...t, title})
            }
    }


    //--------------------------------------------------

    const removeToDoList = (toDoListID: string) => {
        setTodolist(toDoList.filter(tl => tl.id !== toDoListID))
        delete tasks[toDoListID]
    }

    const todoListComponents = toDoList.map(tl => {
        let tasksForTodolist;
        switch (tl.filter) {
            case 'completed':
                tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
                break
            case 'active':
                tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
                break
            default:
                tasksForTodolist = tasks[tl.id]
        }
        return <ToDoList
            toDoListID={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeToDoListFilter={changeToDoListFilter}
            addTask={addTask}
            changeStatus={changeTaskStatus}
            filter={tl.filter}
            removeToDoList={removeToDoList}
        />
    })
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoList: ToDoListType = {
            id: newTodoListID, title: title, filter: 'all'
        }
        setTodolist([...toDoList, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    return (
        <div className={stales.app}>
            <div className={stales.wrapper}>
                <h1 className={stales.appTitle}>To-Do List for Svetailo</h1>
                <button onClick={onClickAddTaskHandler} className={stales.button_addTasks}>Add new task</button>
                <div className={stales.wrap}>
                    <AddItemForm addItem={addTodoList}/>
                    {todoListComponents}
                </div>
            </div>

        </div>
    );
}

export default App;