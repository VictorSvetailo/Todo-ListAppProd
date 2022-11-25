import {addTaskAC, updateTaskAC, removeTaskAC, setTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../../../../app/App';
import {TaskPriorities, TaskStatuses} from '../../../../api/todoLists-api';
import {addTodoListsAC, removeTodoListAC} from '../../todoLists-reducer';


let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'toDoListID',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: ''
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed,
                todoListId: 'toDoListID',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: ''
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New,
                todoListId: 'toDoListID',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: ''
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New,
                todoListId: 'toDoListID',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: ''
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed,
                todoListId: 'toDoListID',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: ''
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New,
                todoListId: 'toDoListID',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: ''
            }
        ]
    }

})


test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC({todoListID: 'todolistId2', taskID: '2'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
    expect(endState['todolistId2'][0].id).toBe('1')
    expect(endState['todolistId2'][1].id).toBe('3')
    expect(endState['todolistId2'][1].id).toBeDefined()
})

test('correct task should be added to correct array', () => {

    // const endState = tasksReducer(startState, addTaskAC('todolistId2', 'juce'))

    const task = {
        todoListId: 'todolistId1',
        id: 'id exists',
        title: 'juce',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: ''
    }

    const action = addTaskAC(task)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(4)

    expect(endState['todolistId2'].length).toBe(3)
    // expect(endState['todolistId2'][3].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('bread')
    // expect(endState['todolistId2'][3].status).toBe(TaskStatuses.New)
    // expect(endState['todolistId2'][3].id).toBe(v1())
})

test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, updateTaskAC({toDoListID: 'todolistId2', taskID: '2', model: {status: TaskStatuses.New}}))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    // expect().toBe()
})


test('change task title', () => {


    const newTitle = 'Hello World Test'

    const endState = tasksReducer(startState, updateTaskAC({toDoListID: 'todolistId1', taskID: '2', model: {title: newTitle}}))

    expect(endState['todolistId1'][1].title).toBe(newTitle)
    expect(endState['todolistId1'][2].title).toBe('React')
    expect(endState['todolistId2'][1].title).toBe('milk')
    // expect().toBe()
})

test('new propperty with array should be added when new todolist is added', () => {

    const action = addTodoListsAC(
        {
            todoList: {
                id: 'test',
                title: 'new todoList',
                order: 0,
                addedDate: ''
            }
        })

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with toDoListID should be deleted', () => {

    const action = removeTodoListAC({toDoListID: 'todolistId2'})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    expect(endState['todolistId2']).toBeUndefined()
})

test('property should toDoListID should be deleted', () => {

    const action = setTaskAC({toDoListID: 'todolistId1', tasks: startState['todolistId1']} )

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': [],
    }, action)


    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})


