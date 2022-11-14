import { authAPI } from "../api/todoLists-api";
import { setIsLoggedInAC } from "../features/Login/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
   status: "idle" as RequestStatusType,
   error: null as string | null,
   isInitialized: false,
};

const slice = createSlice({
   name: "app",
   initialState: initialState,
   reducers: {
      setAppStatusAC(stateDraft, action: PayloadAction<{ status: RequestStatusType }>) {
         stateDraft.status = action.payload.status;
      },
      setAppErrorAC(stateDraft, action: PayloadAction<{ error: string | null }>) {
         stateDraft.error = action.payload.error;
      },
      setAppIsInitializedAC(stateDraft, action: PayloadAction<{ value: boolean }>) {
         stateDraft.isInitialized = action.payload.value;
      },
   },
});

export const appReducer = slice.reducer;
export const { setAppIsInitializedAC, setAppStatusAC, setAppErrorAC } = slice.actions;

export const isInitializeAppTC = () => (dispatch: any) => {
   dispatch(setAppStatusAC({ status: "loading" }));
   authAPI.me().then((res) => {
      if (res.data.resultCode === 0) {
         dispatch(setIsLoggedInAC({ value: true }));
      } else {
      }
      dispatch(setAppIsInitializedAC({ value: true }));
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
// type ActionsType = SetAppStatusAT | SetAppErrorAT | ReturnType<typeof setAppIsInitializedAC>;
