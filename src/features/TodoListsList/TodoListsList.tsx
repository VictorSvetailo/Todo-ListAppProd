import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {addTodoListsTC, fetchTodoListTC, TodoListDomainType} from './todolists-reducer';
import {ToDoList} from './TodoList/ToDoList';
import stales from '../../app/App.module.css';
import AddItemForm from '../../components/AddItemForm/AddItemForm';

type TodoListsListPropsType = {
    demo?: boolean
}
export const TodoListsList: React.FC<TodoListsListPropsType> = ({demo = false}) => {

    const todoList = useSelector<AppRootStateType, Array<TodoListDomainType>>((state => state.todolists))

    const dispatch = useAppDispatch()

    // componentDidMount
    useEffect(() => {
        if (demo){
            return
        }
        dispatch(fetchTodoListTC());

    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListsTC(title))
    }, [dispatch])

    const todoListComponents = todoList.map(tl => {
        return <>
            <div style={{marginTop: '10px'}}>
                <ToDoList
                    key={tl.id}
                    todoList={tl}
                    demo={demo}
                />
            </div>
        </>
    })

    // Component --------------------------------------------------
    return <>
        <div className={stales.wrapper}>
            <h1 className={stales.appTitle}>To-Do List for Svetailo</h1>
            <button className={stales.button_addTasks}>Add new task</button>
            <div className={stales.wrap}>
                <AddItemForm addItem={addTodoList}/>
                <div style={{maxWidth: '1140px'}}>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                        {todoListComponents}
                    </div>
                </div>
            </div>
        </div>
    </>
}