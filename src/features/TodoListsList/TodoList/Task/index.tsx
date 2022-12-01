import {asyncActions as tasksAsyncActions} from './tasks-reducer'
import {slice as tasksSlice} from './tasks-reducer'


const tasksReducer = tasksSlice.reducer

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}

export {
    tasksActions,
    tasksReducer,
}