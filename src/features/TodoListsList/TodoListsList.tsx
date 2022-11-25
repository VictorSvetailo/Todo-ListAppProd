import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {addTodoListsTC, fetchTodoListTC, TodoListDomainType} from './todoLists-reducer';
import {ToDoList} from './TodoList/ToDoList';
import stales from '../../app/App.module.css';
import AddItemForm from '../../components/AddItemForm/AddItemForm';
import {Navigate} from 'react-router-dom';

type TodoListsListPropsType = {
    demo?: boolean;
};
export const TodoListsList: React.FC<TodoListsListPropsType> = ({demo = false}) => {
    const todoList = useSelector<AppRootStateType, Array<TodoListDomainType>>((state) => state.todoLists);
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    // componentDidMount
    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        dispatch(fetchTodoListTC());
    }, []);

    const addTodoList = useCallback(
        (title: string) => {
            dispatch(addTodoListsTC(title));
        },
        [dispatch]
    );

    const todoListComponents = todoList.map((tl) => {
        return (
            <>
                <div
                    style={{
                        marginTop: '10px',
                    }}
                >
                    <ToDoList key={tl.id} todoList={tl} demo={demo}/>
                </div>
            </>
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
                    <AddItemForm addItem={addTodoList}/>
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
