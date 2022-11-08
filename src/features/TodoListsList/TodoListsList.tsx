import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {addTodoListsTC, fetchTodoListTC, TodoListDomainType} from './todolists-reducer';
import {ToDoList} from './TodoList/ToDoList';
import stales from '../../app/App.module.css';
import AddItemForm from '../../components/AddItemForm/AddItemForm';

type TodoListsListPropsType = {}
export const TodoListsList: React.FC<TodoListsListPropsType> = (props) => {

    const todoList = useSelector<AppRootStateType, Array<TodoListDomainType>>((state => state.todolists))

    const dispatch = useDispatch()
    // componentDidMount
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTodoListTC());

    }, [])

    const addTodoList = useCallback((title: string) => {
        // @ts-ignore
        dispatch(addTodoListsTC(title))
    }, [dispatch])

    const todoListComponents = todoList.map(tl => {
        return <>
            <div style={{marginTop: '10px'}}>
                <ToDoList
                    key={tl.id}
                    toDoListID={tl.id}
                    title={tl.title}
                    filter={tl.filter}
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