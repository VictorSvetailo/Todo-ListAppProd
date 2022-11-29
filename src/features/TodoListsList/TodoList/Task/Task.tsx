import React, {ChangeEvent, FC, useCallback, MouseEvent} from 'react';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {TaskStatuses, TaskType} from '../../../../api/todoLists-api';
import {useActions} from '../../../../app/store';
import {tasksActions} from './index';

export type TaskPropsType = {
    todoListId: string;
    task: TaskType;
};

export const Task: FC<TaskPropsType> = React.memo(({todoListId, task}) => {
    const {removeTask, updateTask} = useActions(tasksActions)

    const removeTaskHandler = (e: MouseEvent<HTMLButtonElement>) => {
        removeTask({todoListId: todoListId, taskID: task.id})
    };

    const onChangeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            todoListId: todoListId,
            taskID: task.id,
            model: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
        })
    }, [todoListId, task.id])

    const onChangeTitle = useCallback(
        (newTitle: string) => {
            updateTask({
                todoListId: todoListId,
                taskID: task.id,
                model: {title: newTitle,}})
        },
        [ todoListId, task.id]
    );

    return (
        <li key={task.id} className={task.status === TaskStatuses.Completed ? 'is_done' : ''}>
            <input type="checkbox" onChange={onChangeStatus} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan title={task.title} onChangeTitle={onChangeTitle}/>
            <button onClick={removeTaskHandler}>Delete</button>
        </li>
    );
});
