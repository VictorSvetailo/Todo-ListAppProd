import React, {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType, useAppSelector} from '../../app/store'
import {changeTodoListOrderTC, TodoListDomainType} from './todoLists-reducer'
import {TodoList} from './TodoList/TodoList'
import styles from '../../app/app.module.scss'
import {AddItemForm, AssItemFormSubmitHelperType} from '../../components/AddItemForm/AddItemForm'
import {Navigate} from 'react-router-dom'
import {selectIsLoggedIn} from '../Auth/selectors'
import {todoListsActions} from './index'
import {useActions, useAppDispatch} from '../../utils/redux-utils'
import {SelectVariants} from '../../components/All/Select/SelectSort'

type TodoListsListPropsType = {
    demo?: boolean
    applicationChangingTheme: boolean
}

export const TodoListsList: React.FC<TodoListsListPropsType> = ({applicationChangingTheme, demo = false}) => {
    const todoList = useSelector<AppRootStateType, Array<TodoListDomainType>>(
        state => state.todoLists
    )


    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {fetchTodoListTC} = useActions(todoListsActions)
    const dispatch = useAppDispatch()
    const [currentCard, setCurrentCard] = useState(true)
    // componentDidMount
    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        if (!todoList.length) {
            fetchTodoListTC()
        }
    }, [])

    useEffect(() => {
            fetchTodoListTC()
    }, [currentCard])


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


    const [toDoListID1, setToDoListID1] = useState('')
    const [toDoListID2, setToDoListID2] = useState('')


    const todoListComponents = todoList.map(tl => {
        function dragStartHandler(e: React.DragEvent<HTMLDivElement>, tl: TodoListDomainType) {
            setToDoListID1(tl.id)
        }

        function onDropHandler(e: React.DragEvent<HTMLDivElement>, tl: TodoListDomainType) {
            e.preventDefault()
            setToDoListID2(tl.id)
            e.currentTarget.style.background = 'white'
        }

        function dragEndHandler(e: React.DragEvent<HTMLDivElement>, tl: TodoListDomainType) {
            e.currentTarget.style.background = 'white'
            dispatch(changeTodoListOrderTC({todoList, toDoListID1, toDoListID2}));
            setTimeout(()=>{
                setCurrentCard(!currentCard)
            },200)
        }

        function dragOverHandler(e: React.DragEvent<HTMLDivElement>, tl: TodoListDomainType) {
            e.preventDefault()
            e.currentTarget.style.background = 'green'
        }

        function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>, tl: TodoListDomainType) {
        }


        return (
            <div
                onDragStart={(e) => dragStartHandler(e, tl)}
                onDragLeave={(e) => dragLeaveHandler(e, tl)}
                onDragEnd={(e) => dragEndHandler(e, tl)}
                onDragOver={(e) => dragOverHandler(e, tl)}
                onDrop={(e) => onDropHandler(e, tl)}
                draggable={true}
                key={tl.id}>
                <div style={{width: '300px'}}>
                    <TodoList key={tl.id} todoList={tl} applicationChangingTheme={applicationChangingTheme}
                              demo={demo}/>
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


    // Component --------------------------------------------------
    return (
        <div className={styles.todo__wrap}>
            <div className={styles.todo__header}>
                <div className={styles.todo__header_input}>
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
                <div className={styles.todo__header_elements}>
                    <div>
                        <SelectVariants name={'Sort by'}/>
                    </div>
                    <div>
                        <SelectVariants name={'Back...'}/>
                    </div>
                    <div>
                        <SelectVariants name={'Views'}/>
                    </div>
                </div>
            </div>
            <div className={styles.todo__main}>
                <div style={{display: 'flex', gap: '20px'}}>{todoListComponents}</div>
            </div>


        </div>
    )
}
