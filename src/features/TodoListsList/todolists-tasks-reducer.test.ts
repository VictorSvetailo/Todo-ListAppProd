import {TasksStateType} from '../../app/App';
// import {tasksReducer} from './tasks-reducer';
// import {addTodoListsAC, setToDoListsAC, TodoListDomainType, todolistsReducer} from './todolists-reducer';
// import {v1} from 'uuid';
// import {TodoListType} from '../../api/todoLists-api';
//
// test('ids should be equals', () => {
//     const startTasksState: TasksStateType = {}
//     const startTodoListsState: Array<TodoListDomainType> = []
//
//     const todoList: TodoListType = {
//         id: 'testID',
//         title: 'New Todolist',
//         order: 0,
//         addedDate: ''
//     }
//
//     const action = addTodoListsAC(todoList)
//
//
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todolistsReducer(startTodoListsState, action)
//
//     const keys = Object.keys(endTasksState)
//     const idFromTasks = keys[0]
//     const idFromTodolists = endTodolistsState[0].id
//
//     expect(idFromTasks).toBe(action.todoList.id)
//     expect(idFromTodolists).toBe(action.todoList.id)
// })
//
//
// let todolistId1 = v1()
// let todolistId2 = v1()
//
//
// test('empty arrays should be added when we set todoLists', () => {
//     const action = setToDoListsAC([
//         {id: '1', title: 'What to learn 1 ' ,  addedDate: '', order: 0},
//         {id: '2', title: 'What to buy 1 ', addedDate: '', order: 0}
//     ])
//
//     const endState = tasksReducer({}, action)
//     const keys = Object.keys(endState)
//
//
//     expect(keys.length).toBe(2)
//     expect(endState['1']).toStrictEqual([])
//     expect(endState['2']).toStrictEqual([])
// })