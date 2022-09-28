import {
    addTodolistsAC, changeTodolistFilterAC,
    ChangeTodolistFilterActionType,
    changeTodolistTitleAC,
    removeTodoListAC,
    todolistsReducer
} from './todolists-reducer';
import { v1 } from 'uuid'
import {FilterValuesType, ToDoListType} from '../../App';

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, addTodolistsAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('all')
})


test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE' as const,
    //     id: todolistId2,
    //     title: newTodolistTitle
    // }

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    // const action: ChangeTodolistFilterActionType = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     id: todolistId2,
    //     filter: newFilter
    // }

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})