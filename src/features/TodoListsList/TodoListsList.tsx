import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {TodoListDomainType} from './todoLists-reducer'
import {TodoList} from './TodoList/TodoList'
import styles from '../../app/app.module.css'
import {AddItemForm, AssItemFormSubmitHelperType} from '../../components/AddItemForm/AddItemForm'
import {Navigate} from 'react-router-dom'
import {selectIsLoggedIn} from '../Auth/selectors'
import {todoListsActions} from './index'
import {useActions, useAppDispatch} from '../../utils/redux-utils'
import {Grid} from '@mui/material'
import {SelectVariants} from '../../components/All/Select/SelectSort'

type TodoListsListPropsType = {
    demo?: boolean
}

export const TodoListsList: React.FC<TodoListsListPropsType> = ({demo = false}) => {
    const todoList = useSelector<AppRootStateType, Array<TodoListDomainType>>(
        state => state.todoLists
    )
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {fetchTodoListTC} = useActions(todoListsActions)
    const dispatch = useAppDispatch()

    // componentDidMount
    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        if (!todoList.length) {
            fetchTodoListTC()
        }
    }, [])

    const addTodoListsCB = useCallback(
        async (title: string, helper: AssItemFormSubmitHelperType) => {
            let thunk = todoListsActions.addTodoListsTC(title)
            const resultAction = await dispatch(thunk)

            if (todoListsActions.addTodoListsTC.rejected.match(resultAction)) {
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
        []
    )

    const todoListComponents = todoList.map(tl => {
        return (
            <div key={tl.id}>
                <div style={{width: '300px'}}>
                    <TodoList key={tl.id} todoList={tl} demo={demo}/>
                </div>
            </div>
        )
    })

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    const stylesInput = {
        width: '87%',
        variant: 'outlined',
    }

    const stylesButton = {
        position: 'absolute',
        top: '50%',
        right: '0',
        transform: 'translate(0, -50%)',
        width: '85%',
    }

    //

    //
    // Component --------------------------------------------------
    return (
        <>
            <div className={styles.wrapper}>
                <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                            <div
                                style={{
                                    position: 'relative',
                                    paddingTop: '15px',
                                }}>
                                <AddItemForm
                                    placeholder={'Add Todo-List'}
                                    sizeInput={'small'}
                                    stylesInput={stylesInput}
                                    stylesButton={stylesButton}
                                    sizeButton={'large'}
                                    colorButton={'primary'}
                                    addItem={addTodoListsCB}
                                />
                            </div>
                        </Grid>
                        <Grid style={{paddingTop: '0'}} item xs={3}>
                            <SelectVariants name={'Sort by'}/>
                        </Grid>
                        <Grid style={{paddingTop: '0'}} item xs={3}>
                            <SelectVariants name={'Back...'}/>
                        </Grid>
                        <Grid style={{paddingTop: '0'}} item xs={3}>
                            <SelectVariants name={'Views'}/>
                        </Grid>
                        <Grid item xs={12}>
                            <div
                                style={{
                                    width: '100%',
                                    overflowX: 'auto',
                                    height: '100vh',
                                }}>
                                <div style={{display: 'flex', gap: '20px'}}>{todoListComponents}</div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}
