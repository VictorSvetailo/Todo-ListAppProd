import React, {FC, useCallback, useEffect, MouseEvent, useState} from 'react';
import styles from './ToDoLIst.module.css'
import AddItemForm from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {addTaskTC, fetchTasksTC} from '../state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {
    changeTodolistFilterAC,
    changeTodoListTitleTC,
    FilterValuesType,
    removeTodoListTC
} from '../state/todolists-reducer';
import {Tasks} from './Tasks';
import {TaskStatuses, TaskType, TodoListType} from '../../api/todoLists-api';

export type ToDoListPropsType = {
    toDoListID: string
    title: string
    filter: FilterValuesType
}

export const ToDoList: FC<ToDoListPropsType> = React.memo((props) => {

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTasksTC(props.toDoListID));
    }, [props.toDoListID])


    console.log('ToDoList is called')

    const dispatch = useDispatch()
    const toDoList = useSelector<AppRootStateType, Array<TodoListType>>((state => state.todolists))
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.toDoListID])

    const addTask = useCallback((title: string) => {
        // @ts-ignore
        dispatch(addTaskTC(props.toDoListID, title))
    }, [dispatch])

    const onClickSetFilterCreator = useCallback((filter: FilterValuesType) => {
        return () => {
            dispatch(changeTodolistFilterAC(props.toDoListID, filter))
        }
    }, [])

    let allToDoLIstTasks = tasks;
    let tasksForTodolist: Array<TaskType>;
    switch (props.filter) {
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
        // @ts-ignore
        dispatch(changeTodoListTitleTC(props.toDoListID, title))
    }, [props.toDoListID])

    const [disabledH, setDisabledH] = useState(false)

    const removeTodoListHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        setDisabledH(true)
        // @ts-ignore
        dispatch(removeTodoListTC(props.toDoListID))

    }, [props.toDoListID])


    return (
        <div className={styles.block_list}>
            <h3>
                <EditableSpan title={props.title} onChangeTitle={onChangeTitle}/>

                <button disabled={disabledH} onClick={removeTodoListHandler}>x</button>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {
                    tasksForTodolist.map((task: TaskType) => <Tasks key={task.id} task={task}
                                                                    toDoListID={props.toDoListID} title={props.title}/>)
                }
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

})



