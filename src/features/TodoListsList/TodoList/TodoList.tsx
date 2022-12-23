import React, {FC, MouseEvent, useCallback, useEffect} from 'react'
import styles from './ToDoLIst.module.scss'
import {AddItemForm, AssItemFormSubmitHelperType} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {useSelector} from 'react-redux'
import {AppRootStateType, useAppSelector} from '../../../app/store'
import {TodoListDomainType} from '../todoLists-reducer'
import {Task} from './Task/Task'
import {tasksActions} from './Task'
import {todoListsActions} from '../index'
import {useActions, useAppDispatch} from '../../../utils/redux-utils'
import {TaskStatuses, TaskType} from '../../../api/types'
import {Button, Grid, IconButton, Paper} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {todoListsAPI} from '../../../api/todoLists-api';

export type ToDoListPropsType = {
    todoList: TodoListDomainType
    demo?: boolean
    applicationChangingTheme:boolean
}

export const TodoList: FC<ToDoListPropsType> = React.memo(({applicationChangingTheme, ...props}) => {

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(
        (state) => state.tasks[props.todoList.id]
    )
    const dispatch = useAppDispatch()
    const {removeTodoListTC, changeTodoListTitleTC} =
        useActions(todoListsActions)
    const {fetchTasks} = useActions(tasksActions)

    if (typeof props.demo === 'undefined') props.demo = false

    useEffect(() => {
        if (props.demo) {
            return
        }
        if (!tasks.length) {
            fetchTasks(props.todoList.id)
        }
    }, [])

    const addTaskCB = useCallback(
        async (title: string, helper: AssItemFormSubmitHelperType) => {
            let thunk = tasksActions.addTask({
                todoListId: props.todoList.id,
                title
            })
            const resultAction = await dispatch(thunk)

            if (tasksActions.addTask.rejected.match(resultAction)) {
                if (resultAction.payload?.errors?.length) {
                    const errorMessage = resultAction.payload?.errors[0]
                    helper.setError(errorMessage)
                } else {
                    helper.setError('Some error occurred')
                }
            } else {
                helper.setTitle('')
            }
        },
        [props.todoList.id]
    )

    const onChangeTitle = useCallback(
        (title: string) => {
            changeTodoListTitleTC({toDoListID: props.todoList.id, title})
        },
        [props.todoList.id]
    )

    const removeTodoListHandler = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            removeTodoListTC(props.todoList.id)
        },
        [props.todoList.id]
    )

    let allToDoLIstTasks = tasks
    let tasksForTodolist: Array<TaskType>
    switch (props.todoList.filter) {
        case 'completed':
            tasksForTodolist = allToDoLIstTasks.filter(
                (tasks) => tasks.status === TaskStatuses.Completed
            )
            break
        case 'active':
            tasksForTodolist = allToDoLIstTasks.filter(
                (tasks) => tasks.status === TaskStatuses.New
            )
            break
        default:
            tasksForTodolist = tasks
    }

    //

    const stylesInput = {
        width: '100%',
        variant: 'standard'
    }

    const stylesButton = {
        position: 'absolute',
        top: '50%',
        right: '-2px',
        transform: 'translate(0%, -50%)',
        width: '85%',
        variant: 'outlined'
    }



    return (
        <div>
            <Paper elevation={5}>
                <div className={applicationChangingTheme ? `${styles.block_list} ${styles.active}` : `${styles.block_list}`}>
                    <Grid container direction="row" alignItems="center" spacing={0}>
                        <Grid item xs={10}>
                            <div className={applicationChangingTheme ? `${styles.title} ${styles.active}` : `${styles.title }`}>
                                    <EditableSpan
                                        title={props.todoList.title}
                                        onChangeTitle={onChangeTitle}
                                    />
                            </div>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            item
                            xs={2}
                        >
                            <IconButton
                                disabled={
                                    props.todoList.entityStatus === 'loading'
                                }
                                onClick={removeTodoListHandler}
                                aria-label="delete"
                                color="default"
                            >
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{position: 'relative', paddingTop: '10px'}}>
                                <AddItemForm
                                    placeholder={'Add Task'}
                                    stylesInput={stylesInput}
                                    sizeInput={'small'}
                                    stylesButton={stylesButton}
                                    sizeButton={'medium'}
                                    colorButton={'primary'}
                                    addItem={addTaskCB}
                                    disabled={
                                        props.todoList.entityStatus ===
                                        'loading'
                                    }
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <ul
                                style={{
                                    listStyleType: 'none',
                                    paddingTop: '10px',
                                    maxHeight: '500px',
                                    overflowY: 'auto'
                                }}
                            >
                                {tasksForTodolist.map((task: TaskType) => (
                                    <Task
                                        key={task.id}
                                        task={task}
                                        todoListId={props.todoList.id}
                                    />
                                ))}
                                <div style={{position: 'relative'}}>
                                    {!tasksForTodolist.length && (
                                        <span style={{color: 'grey'}}>
                                            No tasks
                                        </span>
                                    )}
                                </div>
                            </ul>
                        </Grid>
                        <Grid item xs={12}>
                            <FilterButtonComponent todoList={props.todoList}/>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </div>
    )
})

type FilterButtonPropsType = {
    todoList: TodoListDomainType
}

export const FilterButtonComponent: React.FC<FilterButtonPropsType> = (
    props
) => {
    const {changeTodolistFilter} = useActions(todoListsActions)

    return (
        <div>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{xs: 0.5, sm: 0.5, md: 0}}
            >
                <Grid item xs={4}>
                    <Button
                        size={'small'}
                        disabled={props.todoList.entityStatus === 'loading'}
                        onClick={() =>
                            changeTodolistFilter({
                                id: props.todoList.id,
                                filter: 'all'
                            })
                        }
                        color="inherit"
                        variant={
                            props.todoList.filter === 'all'
                                ? `${'contained'}`
                                : 'text'
                        }
                    >
                        All
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant={
                            props.todoList.filter === 'active'
                                ? `${'outlined'}`
                                : 'text'
                        }
                        size={'small'}
                        color="primary"
                        onClick={() =>
                            changeTodolistFilter({
                                id: props.todoList.id,
                                filter: 'active'
                            })
                        }
                    >
                        Active
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant={
                            props.todoList.filter === 'completed'
                                ? `${'outlined'}`
                                : 'text'
                        }
                        size={'small'}
                        color="success"
                        onClick={() =>
                            changeTodolistFilter({
                                id: props.todoList.id,
                                filter: 'completed'
                            })
                        }
                    >
                        Completed
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
