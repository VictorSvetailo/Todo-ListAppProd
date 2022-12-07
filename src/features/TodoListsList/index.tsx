import {
    asyncActions as todoListsAsyncActions,
    slice as todoListsSlice
} from './todoLists-reducer'
import { TodoListsList } from './TodoListsList'

const todoListsActions = {
    ...todoListsAsyncActions,
    ...todoListsSlice.actions
}

const todoListsReducer = todoListsSlice.reducer

export { todoListsActions, todoListsReducer, TodoListsList }

// "eslintConfig": {
//     "extends": [
//         "react-app",
//         "react-app/jest"
//     ],
//         "overrides": [
//         {
//             "files": [
//                 "**/*.stories.*"
//             ],
//             "rules": {
//                 "import/no-anonymous-default-export": "off"
//             }
//         }
//     ]
// },
