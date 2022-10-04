import React, {FC, useCallback} from 'react';
import {FilterValuesType, ToDoListType} from '../../AppWithRedux';
import styles from './ToDoLIst.module.css'
import AddItemForm from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {addTaskAC} from '../state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodoListAC} from '../state/todolists-reducer';
import {Tasks} from './Tasks';

export type ToDoListPropsType = {
    toDoListID: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const ToDoList: FC<ToDoListPropsType> = React.memo((props) => {

    console.log('ToDoList is called')

    const dispatch = useDispatch()
    const toDoList = useSelector<AppRootStateType, Array<ToDoListType>>((state => state.todolists))
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.toDoListID])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.toDoListID, title))
    }, [dispatch])

    const onClickSetFilterCreator = useCallback((filter: FilterValuesType) => {
        return () => {
            dispatch(changeTodolistFilterAC(props.toDoListID, filter))
        }
    }, [])

    let allToDoLIstTasks = tasks;
    let tasksForTodolist = allToDoLIstTasks;
    switch (props.filter) { 
        case 'completed':
            tasksForTodolist = allToDoLIstTasks.filter(tasks => tasks.isDone)
            break
        case 'active':
            tasksForTodolist = allToDoLIstTasks.filter(tasks => !tasks.isDone)
            break
        default:
            tasksForTodolist = tasks
    }

    const onChangeTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(props.toDoListID, title))
    }, [props.toDoListID])


    return (
        <div className={styles.block_list}>
            <h3>
                <EditableSpan title={props.title} onChangeTitle={onChangeTitle}/>
                <button onClick={() => dispatch(removeTodoListAC(props.toDoListID))}>x</button>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {
                    tasksForTodolist.map((task: TaskType) => <Tasks key={task.id} task={task} toDoListID={props.toDoListID} title={props.title}/>)
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



