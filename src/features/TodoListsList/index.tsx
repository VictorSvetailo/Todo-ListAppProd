import {asyncActions as todoListsAsyncActions}  from './todoLists-reducer'
import {slice as todoListsSlice} from './todoLists-reducer'
import {TodoListsList} from './TodoListsList'

const todoListsActions = {
    ...todoListsAsyncActions,
    ...todoListsSlice.actions
}

const todoListsReducer = todoListsSlice.reducer


export {
    todoListsActions,
    todoListsReducer,
    TodoListsList
}