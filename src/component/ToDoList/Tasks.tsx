import React, {ChangeEvent, FC, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {TaskType} from './ToDoList';

export type TaskPropsType = {
    title: string,
    toDoListID: string
    task: TaskType
}
export const Tasks: FC<TaskPropsType> = React.memo((props) => {
    const dispatch = useDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.toDoListID, props.task.id, e.currentTarget.checked))
    }
    const onChangeTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(props.toDoListID, props.task.id, newTitle))
    }, [dispatch])
    return (
        <li key={props.task.id} className={props.task.isDone ? 'is_done' : ''}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={props.task.isDone}/>
            <EditableSpan title={props.task.title} onChangeTitle={onChangeTitle}/>
            <button onClick={() => dispatch(removeTaskAC(props.toDoListID, props.task.id))}>Delete</button>
        </li>
    )
});