import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'
import { combineReducers, createStore } from 'redux'
import {TasksStateType, ToDoListType} from '../../AppWithRedux';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer)
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// определить типы в ручную
// type AppRootStateType ={
//     todolists: Array<ToDoListType>
//     tasks: Array<TasksStateType>
// }
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store