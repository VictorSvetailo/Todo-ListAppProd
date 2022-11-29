import {asyncActions as todoListsAsyncActions}  from './todoLists-reducer'
import {slice} from './todoLists-reducer'
import {TodoListsList} from './TodoListsList'

const todoListsActions = {
    ...todoListsAsyncActions,
    ...slice.actions
}
export {
    todoListsActions,
    TodoListsList
}