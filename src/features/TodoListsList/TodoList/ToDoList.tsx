import React, {FC, useCallback, useEffect, MouseEvent, useState} from 'react';
import styles from './ToDoLIst.module.css'
import AddItemForm from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {addTaskTC, fetchTasksTC} from '../tasks-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../../app/store';
import {
    changeTodolistFilterAC,
    changeTodoListTitleTC,
    FilterValuesType,
    removeTodoListTC, TodoListDomainType
} from '../todolists-reducer';
import {Tasks} from './Task/Tasks';
import {TaskStatuses, TaskType, TodoListType} from '../../../api/todoLists-api';

export type ToDoListPropsType = {
    todoList: TodoListDomainType
    demo?: boolean
}

export const ToDoList: FC<ToDoListPropsType> = React.memo((props) => {

    if (typeof props.demo === 'undefined') props.demo = false
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (props.demo) {
            return
        }
        dispatch(fetchTasksTC(props.todoList.id));
    }, [props.todoList.id])

    const toDoList = useSelector<AppRootStateType, Array<TodoListType>>((state => state.todolists))
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoList.id])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.todoList.id, title))
    }, [dispatch])

    const onClickSetFilterCreator = useCallback((filter: FilterValuesType) => {
        return () => {
            dispatch(changeTodolistFilterAC(props.todoList.id, filter))
        }
    }, [])

    let allToDoLIstTasks = tasks;
    let tasksForTodolist: Array<TaskType>;
    switch (props.todoList.filter) {
        case 'completed':
            tasksForTodolist = allToDoLIstTasks.filter(tasks => tasks.status === TaskStatuses.Completed)
            break
        case 'active':
            tasksForTodolist = allToDoLIstTasks.filter(tasks => tasks.status === TaskStatuses.New)
            break
        default:
            tasksForTodolist = tasks
    }

    const onChangeTitle = useCallback((title: string) => {
        dispatch(changeTodoListTitleTC(props.todoList.id, title))
    }, [props.todoList.id])


    const removeTodoListHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        dispatch(removeTodoListTC(props.todoList.id))
    }, [props.todoList.id])


    return (
        <div className={styles.block_list}>
            <h3>
                <EditableSpan title={props.todoList.title} onChangeTitle={onChangeTitle}/>

                <button disabled={props.todoList.entityStatus === 'loading'} onClick={removeTodoListHandler}>x</button>
            </h3>
            <div>
                <AddItemForm addItem={addTask} disabled={props.todoList.entityStatus === 'loading'} />
            </div>
            <ul>
                {
                    tasksForTodolist.map((task: TaskType) => <Tasks key={task.id} task={task}
                                                                    toDoListID={props.todoList.id} title={props.todoList.title}/>)
                }
            </ul>
            <div>
                <button disabled={props.todoList.entityStatus === 'loading'} className={props.todoList.filter === 'all' ? `${styles.active_filter}` : ''}
                        onClick={onClickSetFilterCreator('all')}>All
                </button>
                <button className={props.todoList.filter === 'active' ? `${styles.active_filter}` : ''}
                        onClick={onClickSetFilterCreator('active')}>Active
                </button>
                <button className={props.todoList.filter === 'completed' ? `${styles.active_filter}` : ''}
                        onClick={onClickSetFilterCreator('completed')}>Completed
                </button>
            </div>
        </div>
    )

})



