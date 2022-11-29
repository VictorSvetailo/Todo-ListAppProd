import React, {FC, useCallback, useEffect, MouseEvent, useState} from 'react';
import styles from './ToDoLIst.module.css';
import AddItemForm from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {useSelector} from 'react-redux';
import {AppRootStateType, useActions, useAppDispatch} from '../../../app/store';
import {
    TodoListDomainType
} from '../todoLists-reducer';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todoLists-api';
import {tasksActions} from './Task';
import {todoListsActions} from '../index';
import {authActions} from '../../Auth';

export type ToDoListPropsType = {
    todoList: TodoListDomainType;
    demo?: boolean;
};

export const TodoList: FC<ToDoListPropsType> = React.memo((props) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[props.todoList.id]);
    const dispatch = useAppDispatch()
    const {removeTodoListTC, changeTodoListTitleTC} = useActions(todoListsActions)
    const {fetchTasks} = useActions(tasksActions)

    if (typeof props.demo === 'undefined') props.demo = false;

    useEffect(() => {
        if (props.demo) {
            return;
        }
        fetchTasks(props.todoList.id)
    }, []);

    const addTaskCB = useCallback(async (title: string) => {
            let thunk = tasksActions.addTask({todoListId: props.todoList.id, title});

            const resultAction = await dispatch(thunk)

            if (tasksActions.addTask.rejected.match(resultAction)) {
                if (resultAction.payload?.errors?.length) {
                    const errorMessage = resultAction.payload?.errors[0]
                    throw new Error(errorMessage)
                } else {
                    throw new Error('Some error occurred')
                }
            }

        }, [props.todoList.id]
    );

    const onChangeTitle = useCallback(
        (title: string) => {
            changeTodoListTitleTC({toDoListID: props.todoList.id, title})
        },
        [props.todoList.id]
    );

    const removeTodoListHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        removeTodoListTC(props.todoList.id)
    }, [props.todoList.id]);


    let allToDoLIstTasks = tasks;
    let tasksForTodolist: Array<TaskType>;
    switch (props.todoList.filter) {
        case 'completed':
            tasksForTodolist = allToDoLIstTasks.filter((tasks) => tasks.status === TaskStatuses.Completed);
            break;
        case 'active':
            tasksForTodolist = allToDoLIstTasks.filter((tasks) => tasks.status === TaskStatuses.New);
            break;
        default:
            tasksForTodolist = tasks;
    }

    return (
        <div className={styles.block_list}>
            <h3>
                <EditableSpan title={props.todoList.title} onChangeTitle={onChangeTitle}/>
                <button disabled={props.todoList.entityStatus === 'loading'} onClick={removeTodoListHandler}>x</button>
            </h3>
            <div>
                <AddItemForm addItem={addTaskCB} disabled={props.todoList.entityStatus === 'loading'}/>
            </div>
            <ul>
                {tasksForTodolist.map((task: TaskType) => (
                    <Task key={task.id} task={task} todoListId={props.todoList.id}/>
                ))}
                {!tasksForTodolist.length && <span style={{color: 'grey'}}>No tasks</span>}
            </ul>
            <div>
                <FilterButton todoList={props.todoList}/>
            </div>
        </div>
    );
});

type FilterButtonPropsType = {
    todoList: TodoListDomainType;
}

const FilterButton: React.FC<FilterButtonPropsType> = (props) => {
    const {changeTodolistFilter} = useActions(todoListsActions)

    return <div>
        <button disabled={props.todoList.entityStatus === 'loading'}
                className={props.todoList.filter === 'all' ? `${styles.active_filter}` : ''}
                onClick={() => changeTodolistFilter({id: props.todoList.id, filter: 'all'})}>
            All
        </button>
        <button className={props.todoList.filter === 'active' ? `${styles.active_filter}` : ''}
                onClick={() => changeTodolistFilter({id: props.todoList.id, filter: 'active'})}>
            Active
        </button>
        <button className={props.todoList.filter === 'completed' ? `${styles.active_filter}` : ''}
                onClick={() => changeTodolistFilter({id: props.todoList.id, filter: 'completed'})}>
            Completed
        </button>
    </div>
}
