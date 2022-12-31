
import {TasksStateType} from '../../app/App';
import {addTodoListsTC, TodoListDomainType} from './todoLists-reducer';
import {tasksReducer} from './TodoList/Task';
import {todoListsReducer} from './index';
import {TodoListType} from '../../DAL/Todo-List-DAL/types';

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
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.payload.todoList.id)
    expect(idFromTodoLists).toBe(action.payload.todoList.id)
})

