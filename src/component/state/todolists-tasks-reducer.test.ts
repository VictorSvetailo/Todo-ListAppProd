import {TasksStateType, ToDoListType} from '../../AppWithRedux';
import {tasksReducer} from './tasks-reducer';
import {addTodolistsAC, todolistsReducer} from './todolists-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<ToDoListType> = []

    const action = addTodolistsAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.toDoListID)
    expect(idFromTodolists).toBe(action.toDoListID)
})