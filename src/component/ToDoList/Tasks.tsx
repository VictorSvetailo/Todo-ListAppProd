import React, {ChangeEvent, FC, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {TaskStatuses, TaskType} from '../../api/todoLists-api';

export type TaskPropsType = {
    title: string,
    toDoListID: string
    task: TaskType
}
export const Tasks: FC<TaskPropsType> = React.memo((props) => {
    const dispatch = useDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.toDoListID, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
    }
    const onChangeTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(props.toDoListID, props.task.id, newTitle))
    }, [dispatch])
    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is_done' : ''}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.task.title} onChangeTitle={onChangeTitle}/>
            <button onClick={() => dispatch(removeTaskAC(props.toDoListID, props.task.id))}>Delete</button>
        </li>
    )
});