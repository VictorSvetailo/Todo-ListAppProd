import React, {MouseEvent, FC, KeyboardEvent, useState, ChangeEvent} from 'react';
import {FilterValuesType} from '../../App';
import styles from './ToDoLIst.module.css'

export type ToDoListPropsType = {
    removeToDoList: (toDoListID: string) => void
    toDoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, toDoListID: string) => void
    changeToDoListFilter: (filter: FilterValuesType, toDoListID: string) => void
    addTask: (title: string, toDoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, toDoListID: string) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const ToDoList: FC<ToDoListPropsType> = (props) => {
            // const removeToDoListHandler = (e: MouseEvent<HTMLButtonElement>) => {
            //    props.removeToDoList(props.toDoListID)
            // }


        // Input------------
        const [title, setTitle] = useState<string>('')
        const [error, setError] = useState<string | null>(null)
        const onClickAddTask = () => {
            if (title.trim()) {
                props.addTask(title.trim(), props.toDoListID)
            } else {
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
        const onClickSetFilterCreator = (filter: FilterValuesType) => {
            return () => {
                props.changeToDoListFilter(filter, props.toDoListID)
            }
        }

        const tasksItems = props.tasks.map((task: TaskType) => {
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debugger
                props.changeStatus(task.id, e.currentTarget.checked, props.toDoListID)
            }
            return (
                <li key={task.id} className={task.isDone ? 'is_done' : ''}>
                    <input type="checkbox"
                           onChange={onChangeHandler}
                           checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id, props.toDoListID)}>Delete</button>
                </li>
            )
        })//removeToDoListHandler
        return (
            <div className={styles.block_list}>
                <h3>{props.title}<button onClick={()=>props.removeToDoList(props.toDoListID)}>x</button></h3>
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
                    <button className={props.filter === 'all' ? `${styles.active_filter}` : ''}
                            onClick={onClickSetFilterCreator('all')}>All
                    </button>
                    <button className={props.filter === 'active' ? `${styles.active_filter}` : ''}
                            onClick={onClickSetFilterCreator('active')}>Active
                    </button>
                    <button className={props.filter === 'completed' ? `${styles.active_filter}` : ''}
                            onClick={onClickSetFilterCreator('completed')}>Completed
                    </button>
                </div>
            </div>
        )

    }
;


