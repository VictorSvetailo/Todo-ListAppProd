import { AppRootStateType, store } from "../app/store";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { tasksReducer } from "../features/TodoListsList/tasks-reducer";
import { appReducer } from "../app/app-reduser";
import { TaskPriorities, TaskStatuses } from "../api/todoLists-api";
import { todoListsReducer } from "../features/TodoListsList/todo-lists-reducer";
import { v1 } from "uuid";

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todoLists: todoListsReducer,
   app: appReducer,
});

const initialGlobalState: AppRootStateType = {
   todoLists: [
      {
         id: "todolistId1",
         title: "Whattolearn",
         filter: "all",
         entityStatus: "idle",
         addedDate: "",
         order: 0,
      },
      {
         id: "todolistId2",
         title: "Whattobuy",
         filter: "all",
         entityStatus: "loading",
         addedDate: "",
         order: 0,
      },
   ],
   tasks: {
      ["todolistId1"]: [
         {
            id: v1(),
            title: "HTML&CSS",
            status: TaskStatuses.Completed,
            todoListId: "todolistId1",
            description: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low,
         },
         {
            id: v1(),
            title: "JS",
            status: TaskStatuses.Completed,
            todoListId: "todolistId1",
            description: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low,
         },
      ],
      ["todolistId2"]: [
         {
            id: v1(),
            title: "Milk",
            status: TaskStatuses.Completed,
            todoListId: "todolistId2",
            description: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low,
         },
         {
            id: v1(),
            title: "ReactBook",
            status: TaskStatuses.Completed,
            todoListId: "todolistId2",
            description: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low,
         },
      ],
   },
   app: {
      error: null,
      status: "idle",
      isInitialized: false,
   },
   auth: {
      isLoggedIn: false,
   },
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware));
export const ReduxStoreProviderDecorator = (storyFn: any) => <Provider store={storyBookStore}>{storyFn()}</Provider>;

// export const ReduxStoreProviderDecorator = (storyFn: ()=> JSX.Element) => {
//     return <Provider store={store}>{storyFn()}</Provider>
// }

// React.ReactNode
