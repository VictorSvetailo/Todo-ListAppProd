import React, {ChangeEvent, FC, useCallback, MouseEvent} from 'react';
import {useDispatch} from 'react-redux';
import {removeTaskTC, updateTaskTC} from './tasks-reducer';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {TaskStatuses, TaskType} from '../../../../api/todoLists-api';
import {useAppDispatch} from '../../../../app/store';

export type TaskPropsType = {
    title: string;
    toDoListID: string;
    task: TaskType;
};

export const Tasks: FC<TaskPropsType> = React.memo((props) => {
    const dispatch = useAppDispatch();
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            updateTaskTC(props.toDoListID, props.task.id, {
                status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
            })
        );
    };

    const onChangeTitle = useCallback(
        (newTitle: string) => {
            dispatch(
                updateTaskTC(props.toDoListID, props.task.id, {
                    title: newTitle,
                })
            );
        },
        [dispatch]
    );

    const removeTaskHandler = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(removeTaskTC(props.toDoListID, props.task.id));
    };

    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is_done' : ''}>
            <input type="checkbox" onChange={onChangeStatus} checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.task.title} onChangeTitle={onChangeTitle}/>
            <button onClick={removeTaskHandler}>Delete</button>
        </li>
    );
});
