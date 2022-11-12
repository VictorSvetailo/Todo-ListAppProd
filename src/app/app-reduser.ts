import { authAPI, TaskStatuses, TodoListType } from "../api/todoLists-api";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { setIsLoggedInAC } from "../features/Login/auth-reducer";

export const initialState: InitialStateType = {
   status: "idle" as RequestStatusType,
   error: null,
   isInitialized: false,
};

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case "APP/SET_STATUS":
         return {
            ...state,
            status: action.status,
         };
      case "APP/SET_ERROR":
         return {
            ...state,
            error: action.error,
         };
      case "APP/SET_IS_INITIALIZED":
         return {
            ...state,
            isInitialized: action.value,
         };
      default:
         return {
            ...state,
         };
   }
};

export const setAppStatusAC = (status: RequestStatusType) =>
   ({
      type: "APP/SET_STATUS",
      status,
   } as const);

export const setAppErrorAC = (error: string | null) =>
   ({
      type: "APP/SET_ERROR",
      error,
   } as const);

export const setAppIsInitializedAC = (value: boolean) =>
   ({
      type: "APP/SET_IS_INITIALIZED",
      value,
   } as const);

export const isInitializeAppTC = () => (dispatch: any) => {
   // dispatch(setAppStatusAC("loading"));
   authAPI.me().then((res) => {
      if (res.data.resultCode === 0) {
         dispatch(setIsLoggedInAC(true));
      } else {
      }
      dispatch(setAppIsInitializedAC(true));
   });
};

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type InitialStateType = {
   // происходит ли сейчас взаимодействие с сервером
   status: RequestStatusType;
   // если ошибка какая-то глобальная произойдет - мы запишем ошибки сюда
   error: string | null;
   // true когда приложение проинициализировалось (проверили юзера, настройки получили и тд)
   isInitialized: boolean;
};

export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>;
type ActionsType = SetAppStatusAT | SetAppErrorAT | ReturnType<typeof setAppIsInitializedAC>;
