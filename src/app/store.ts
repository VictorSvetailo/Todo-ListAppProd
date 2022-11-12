import { TasksActionType, tasksReducer } from "../features/TodoListsList/tasks-reducer";
import { TodoListsActionType, todolistsReducer } from "../features/TodoListsList/todolists-reducer";
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reduser";
import { useDispatch } from "react-redux";
import { authReducer, LoginActionType, LoginDispatch } from "../features/Login/auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
   todolists: todolistsReducer,
   tasks: tasksReducer,
   app: appReducer,
   auth: authReducer,
});
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;

// все типы action lkz всего App
export type AppActionsType = TodoListsActionType | TasksActionType | LoginActionType;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
// export type AppDispatch = typeof store.dispatch
// export type AppDispatch = any
// определить типы в ручную
// type AppRootStateType ={
//     todolists: Array<ToDoListType>
//     tasks: Array<TasksStateType>
// }
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
