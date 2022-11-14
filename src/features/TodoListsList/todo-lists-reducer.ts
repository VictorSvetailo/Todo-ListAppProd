import { todoListsAPI, TodoListType } from "../../api/todoLists-api";
import { Dispatch } from "redux";
import { RequestStatusType, setAppStatusAC } from "../../app/app-reduser";
import { handleServerNetworkError } from "../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Array<TodoListDomainType> = [];

const slice = createSlice({
   name: "todoLists",
   initialState: initialState,
   reducers: {
      addTodoListsAC(stateDraft, action: PayloadAction<{ todoList: TodoListType }>) {
         stateDraft.unshift({ ...action.payload.todoList, filter: "all", entityStatus: "idle" });
      },
      removeTodoListAC(stateDraft, action: PayloadAction<{ toDoListID: string }>) {
         const index = stateDraft.findIndex((tl) => tl.id === action.payload.toDoListID);
         if (index > -1) {
            stateDraft.splice(index, 1);
         }
      },
      changeTodolistTitleAC(stateDraft, action: PayloadAction<{ id: string; title: string }>) {
         const index = stateDraft.findIndex((tl) => tl.id === action.payload.id);
         stateDraft[index].title = action.payload.title;
      },
      changeTodolistFilterAC(stateDraft, action: PayloadAction<{ id: string; filter: FilterValuesType }>) {
         const index = stateDraft.findIndex((tl) => tl.id === action.payload.id);
         stateDraft[index].filter = action.payload.filter;
      },
      changeTodolistEntityStatusAC(stateDraft, action: PayloadAction<{ id: string; status: RequestStatusType }>) {
         const index = stateDraft.findIndex((tl) => tl.id === action.payload.id);
         stateDraft[index].entityStatus = action.payload.status;
      },
      setToDoListsAC(stateDraft, action: PayloadAction<{ todoLists: TodoListType[] }>) {
         return action.payload.todoLists.map((el) => ({
            ...el,
            filter: "all",
            entityStatus: "idle",
         }));
      },
   },
});

export const todoListsReducer = slice.reducer;
export const { addTodoListsAC, removeTodoListAC, changeTodolistTitleAC, changeTodolistFilterAC, changeTodolistEntityStatusAC, setToDoListsAC } = slice.actions;

// thunks
// export const fetchTodoListTC = () => (dispatch: ThunkDispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     todoListsAPI.getTodoLists()
//         .then((res) => {
//             dispatch(setToDoListsAC(res.data))
//             dispatch(setAppStatusAC('succeeded'))
//         })
// }

export const fetchTodoListTC = () => async (dispatch: Dispatch) => {
   try {
      dispatch(setAppStatusAC({ status: "loading" }));
      const res = await todoListsAPI.getTodoLists();
      dispatch(setToDoListsAC({ todoLists: res.data }));
      dispatch(setAppStatusAC({ status: "succeeded" }));
   } catch (error) {
      // @ts-ignore
      handleServerNetworkError(error, dispatch);
   }
};

export const addTodoListsTC = (title: string) => async (dispatch: Dispatch) => {
   dispatch(setAppStatusAC({ status: "loading" }));
   const res = await todoListsAPI.createTodoLists(title);
   dispatch(addTodoListsAC({ todoList: res.data.data.item }));
   dispatch(setAppStatusAC({ status: "succeeded" }));
};
export const removeTodoListTC = (toDoListID: string) => (dispatch: Dispatch) => {
   dispatch(setAppStatusAC({ status: "loading" }));
   dispatch(changeTodolistEntityStatusAC({ id: toDoListID, status: "loading" }));
   todoListsAPI.deleteTodoLists(toDoListID).then((res) => {
      dispatch(removeTodoListAC({ toDoListID }));
      dispatch(setAppStatusAC({ status: "succeeded" }));
   });
};
export const changeTodoListTitleTC = (toDoListID: string, title: string) => (dispatch: Dispatch) => {
   dispatch(setAppStatusAC({ status: "loading" }));
   todoListsAPI.updateTodoLists(toDoListID, title).then((res) => {
      dispatch(changeTodolistTitleAC({ id: toDoListID, title }));
      dispatch(setAppStatusAC({ status: "succeeded" }));
   });
};

// - types -
export type AddTodoListActionType = ReturnType<typeof addTodoListsAC>;
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>;
export type SetTodoListActionType = ReturnType<typeof setToDoListsAC>;
// export type TodoListsActionType =
//     AddTodoListActionType
//     | RemoveTodoListActionType
//     | SetTodoListActionType
//     | ReturnType<typeof changeTodolistTitleAC>
//     | ReturnType<typeof changeTodolistFilterAC>
//     | ReturnType<typeof changeTodolistEntityStatusAC>;

export type FilterValuesType = "all" | "completed" | "active";
// export type ThunkDispatch = Dispatch<AppActionsType | SetAppStatusAT | SetAppErrorAT>;

export type TodoListDomainType = TodoListType & {
   filter: FilterValuesType;
   entityStatus: RequestStatusType;
};
