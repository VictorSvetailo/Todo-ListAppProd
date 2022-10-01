import React, {MouseEvent, FC, KeyboardEvent, useState, ChangeEvent} from 'react';
import {FilterValuesType} from '../../App';
import styles from './ToDoLIst.module.css'
import AddItemForm from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';

export type ToDoListPropsType = {
    removeToDoList: (toDoListID: string) => void
    toDoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (toDoListID: string, taskID: string) => void
    changeToDoListFilter: (toDoListID: string, filter: FilterValuesType) => void
    addTask: (toDoListID: string, title: string) => void
    changeStatus: (toDoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    changeTaskTitle: (toDoListID: string, idTask: string, newTitle: string) => void
    changeToDoListTitle: (toDoListID: string, newTitle: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const ToDoList: FC<ToDoListPropsType> = (props) => {
        const addItem = (title: string) => {
            props.addTask(props.toDoListID, title)
        }

    const onChangeToDoListTitle = (newTitle: string) => {
        props.changeToDoListTitle(props.toDoListID, newTitle)
    }
        const onClickSetFilterCreator = (filter: FilterValuesType) => {
            return () => {
                props.changeToDoListFilter(props.toDoListID, filter)
            }
        }
        const tasksItems = props.tasks.map((task: TaskType) => {
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(props.toDoListID, task.id, e.currentTarget.checked)
            }
            const onChangeTitleHandler = (newTitle: string) => {
                props.changeTaskTitle(props.toDoListID, task.id, newTitle)
            }
            return (
                <li key={task.id} className={task.isDone ? 'is_done' : ''}>
                    <input type="checkbox"
                           onChange={onChangeHandler}
                           checked={task.isDone}/>
                    <EditableSpan title={task.title} onChangeTitle={onChangeTitleHandler}/>
                    <button onClick={() => props.removeTask(props.toDoListID, task.id)}>Delete</button>
                </li>
            )
        })

        return (
            <div className={styles.block_list}>
                <h3>
                    <EditableSpan title={props.title} onChangeTitle={onChangeToDoListTitle}/>
                    <button onClick={() => props.removeToDoList(props.toDoListID)}>x</button>
                </h3>
                <div>
                    <AddItemForm addItem={addItem}/>
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


