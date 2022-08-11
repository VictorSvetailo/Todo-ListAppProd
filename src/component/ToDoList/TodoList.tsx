import React, {MouseEvent, FC, KeyboardEvent, useState, ChangeEvent} from 'react';
import {FilterValuesType} from '../../App';
import styles from './ToDoLIst.module.css'

export type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const TodoList: FC<TodoListPropsType> = (props) => {
    // Input------------
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onClickAddTask = () => {
        if (title.trim()){
            props.addTask(title.trim())
        }else{
            setError('Title is required')
        }
        setTitle('')
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
    //------------
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onClickSetFilterCreator = (filter: FilterValuesType) => () => {
        props.changeFilter(filter)
    }

    // Вриант #1
    const tasksItems = props.tasks.map((task: TaskType) => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked)
            console.log(task.id +  e.currentTarget.checked)
        }
        return (
            <li key={task.id} className={task.isDone ? "is_done" : ''}>
                <input type="checkbox"
                       onChange={onChangeHandler}
                       checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>Delete</button>
            </li>
        )
    })
    return (
        <div className={styles.block_list}>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeSetTitle}
                       onKeyDown={onKeyDownAddTask}
                       className={error ? `${styles.error}` : ''}
                />
                <button onClick={onClickAddTask}>Add</button>
                {error && <div className={styles.error_message}>*Field is required</div>}
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button className={ props.filter === 'all' ? `${styles.active_filter}` : ''} onClick={onClickSetFilterCreator('all')}>All</button>
                <button className={ props.filter === 'active' ? `${styles.active_filter}` : ''}  onClick={onClickSetFilterCreator('active')}>Active</button>
                <button className={ props.filter === 'completed' ? `${styles.active_filter}` : ''}  onClick={onClickSetFilterCreator('completed')}>Completed</button>
            </div>
        </div>
    )

};


