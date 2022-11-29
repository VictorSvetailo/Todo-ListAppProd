import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType, useActions} from '../../app/store';
import {TodoListDomainType} from './todoLists-reducer';
import {TodoList} from './TodoList/TodoList';
import stales from '../../app/App.module.css';
import AddItemForm from '../../components/AddItemForm/AddItemForm';
import {Navigate} from 'react-router-dom';
import {selectIsLoggedIn} from '../Auth/selectors';
import {todoListsActions} from './index';

type TodoListsListPropsType = {
    demo?: boolean;
};
export const TodoListsList: React.FC<TodoListsListPropsType> = ({demo = false}) => {
    const todoList = useSelector<AppRootStateType, Array<TodoListDomainType>>((state) => state.todoLists);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const {addTodoListsTC, fetchTodoListTC} = useActions(todoListsActions)

    // componentDidMount
    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        fetchTodoListTC()
    }, []);

    const addTodoListsCB = useCallback(async (title: string) => {
        addTodoListsTC(title);
        }, []
    );


    const todoListComponents = todoList.map((tl) => {
        return (
            <div key={tl.id}>
                <div
                    style={{width: '300px',  marginTop: '10px',}}>
                    <TodoList key={tl.id} todoList={tl} demo={demo}/>
                </div>
            </div>
        );
    });

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    // Component --------------------------------------------------
    return (
        <>
            <div className={stales.wrapper}>
                <h1 className={stales.appTitle}>To-do List</h1>
                <div className={stales.wrap}>
                    <AddItemForm addItem={addTodoListsCB}/>
                    <div
                        style={{
                            maxWidth: '1140px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '20px',
                            }}
                        >
                            {todoListComponents}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
