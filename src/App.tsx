import React, {useState} from 'react';
import stales from './App.module.css';
import  {TodoList, TaskType} from './component/ToDoList/TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {

    const todoListTitle: string = 'What to learn?';

    //Data Array--------------------------------------------------
    const [tasks, setTasks] = React.useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'CSS ', isDone: false},
        {id: v1(), title: 'JS/TS ', isDone: false},
    ])
    //--------------------------------------------------
    // Add New Tasks
    const onClickAddTaskHandler = () =>{
        console.log('Add-New Task')

    }



    // Change status
    function changeStatus(taskId: string, isDone: boolean){
        let task = tasks.find((t)=> t.id === taskId)
        if(task){
            task.isDone = isDone
        }
        setTasks([...tasks])
    }
    // Remove--------------------------------------------------
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID))
        console.log(tasks)
    }
    //--------------------------------------------------

    // sortirovka--------------------------------------------------
    let [filter, setFilter] = useState<FilterValuesType>('all');

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        console.log('hopa')
        tasksForTodolist = tasks.filter(t => t.isDone === true);


    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    //--------------------------------------------------

// Add Tasks
    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }


    return (
        <div className={stales.app}>
            <div className={stales.wrapper}>
                <h1 className={stales.appTitle}>To-Do List Svetailo</h1>
                <button onClick={onClickAddTaskHandler} className={stales.button_addTasks}>Add new task</button>
                <div className={stales.wrap}>
                    <TodoList
                        title={todoListTitle}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={filter}
                    />
                </div>
            </div>


            {/*<TodoList title={'What to buy'}/>*/}
            {/*<TodoList title={'What to read'}/>*/}
        </div>
    );
}

export default App;