import React, {ChangeEvent, FC, useCallback, MouseEvent} from 'react';
import {useDispatch} from 'react-redux';
import {
    removeTaskTC, updateTaskTC
} from '../state/tasks-reducer';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {TaskStatuses, TaskType} from '../../api/todoLists-api';

export type TaskPropsType = {
    title: string,
    toDoListID: string
    task: TaskType
}


export const Tasks: FC<TaskPropsType> = React.memo((props) => {
    const dispatch = useDispatch()
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        let status = e.currentTarget.checked
            ? TaskStatuses.Completed : TaskStatuses.New
        // @ts-ignore
        dispatch(updateTaskTC(props.toDoListID, props.task.id, {status}))
    }


    const onChangeTitle = useCallback((newTitle: string) => {
        // @ts-ignore
        dispatch(updateTaskTC(props.toDoListID, props.task.id, {title: newTitle}))
    }, [dispatch])

    const removeTaskHandler = (e: MouseEvent<HTMLButtonElement>) => {
        // @ts-ignore
        dispatch(removeTaskTC(props.toDoListID, props.task.id))

    }


    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is_done' : ''}>
            <input type="checkbox"
                   onChange={onChangeStatus}
                   checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.task.title} onChangeTitle={onChangeTitle}/>
            <button onClick={removeTaskHandler}>Delete</button>
        </li>
    )
});