import {
    addTodoListsTC,
    changeTodolistEntityStatus,
    changeTodolistFilter,
    changeTodoListTitleTC,
    fetchTodoListTC,
    FilterValuesType,
    removeTodoListTC,
    TodoListDomainType,
    todoListsReducer
} from './todoLists-reducer';
import {v1} from 'uuid';
import {TodoListType} from '../../api/todoLists-api';
import {RequestStatusType} from '../../app/app-reducer';

let todolistId1 = v1();
let todolistId2 = v1();

let startState: Array<TodoListDomainType> = [];
beforeEach(() => {
    startState = [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
            entityStatus: 'idle',
            addedDate: '',
            order: 0,
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
            entityStatus: 'idle',
            addedDate: '',
            order: 0,
        },
    ];
});

test('correct todolist should be removed', () => {
    let payload = {id: todolistId1};
    const endState = todoListsReducer(startState, removeTodoListTC.fulfilled(payload, 'requestId', todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const todoList: TodoListType = {
        id: 'testID',
        title: 'New Todolist',
        order: 0,
        addedDate: '',
    };

    const endState = todoListsReducer(startState, addTodoListsTC.fulfilled({todoList}, 'requestId', todoList.title));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todoList.title);
    expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    let payload = {toDoListID: todolistId2, title: newTodolistTitle}
    const action = changeTodoListTitleTC.fulfilled(payload, 'requestId', payload)

    const endState = todoListsReducer(startState, action);
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';

    const endState = todoListsReducer(startState, changeTodolistFilter({id: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('todolist should be set to the state', () => {
    let payload = {todoLists: startState};
    const action = fetchTodoListTC.fulfilled(payload,'requestId');
    const endState = todoListsReducer([], action);
    expect(endState.length).toBe(2);
});

test('correct entity Status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading';

    const endState = todoListsReducer(startState, changeTodolistEntityStatus({id: todolistId2, status: newStatus}));

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newStatus);
});
