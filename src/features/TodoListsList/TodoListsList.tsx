import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType, useActions, useAppDispatch} from '../../app/store';
import {TodoListDomainType} from './todoLists-reducer';
import {TodoList} from './TodoList/TodoList';
import stales from '../../app/App.module.css';
import AddItemForm, {AssItemFormSubmitHelperType} from '../../components/AddItemForm/AddItemForm';
import {Navigate} from 'react-router-dom';
import {selectIsLoggedIn} from '../Auth/selectors';
import {todoListsActions} from './index';
import {tasksActions} from './TodoList/Task';

type TodoListsListPropsType = {
    demo?: boolean;
};
export const TodoListsList: React.FC<TodoListsListPropsType> = ({demo = false}) => {
    const todoList = useSelector<AppRootStateType, Array<TodoListDomainType>>((state) => state.todoLists);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const {fetchTodoListTC} = useActions(todoListsActions)
    const dispatch = useAppDispatch()
    // componentDidMount
    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        fetchTodoListTC()
    }, []);

    const addTodoListsCB = useCallback(async (title: string, helper: AssItemFormSubmitHelperType) => {
        let thunk = todoListsActions.addTodoListsTC(title);
        const resultAction = await dispatch(thunk)

        if (todoListsActions.addTodoListsTC.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occurred')
            }
        }else{
            helper.setTitle('')
        }
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




