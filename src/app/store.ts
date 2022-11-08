import { tasksReducer } from '../features/TodoListsList/tasks-reducer'
import { todolistsReducer } from '../features/TodoListsList/todolists-reducer'
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
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