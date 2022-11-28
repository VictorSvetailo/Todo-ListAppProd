
import {TodoListType} from '../../api/todoLists-api';
import {TasksStateType} from '../../app/App';
import {addTodoListsTC, TodoListDomainType, todoListsReducer} from './todoLists-reducer';
import {tasksReducer} from './TodoList/Task/tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListDomainType> = []

    const todoList: TodoListType = {
        id: 'testID',
        title: 'New Todolist',
        order: 0,
        addedDate: ''
    }

    const action = addTodoListsTC.fulfilled({todoList}, 'requestID', todoList.title)


    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todoList.id)
    expect(idFromTodolists).toBe(action.payload.todoList.id)
})

