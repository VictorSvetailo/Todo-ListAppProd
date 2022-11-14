import { setAppStatusAC } from "../../app/app-reduser";
import { Dispatch } from "redux";
import { authAPI, LoginParamsType, TaskStatuses } from "../../api/todoLists-api";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
   isLoggedIn: false,
};

const slice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {
      setIsLoggedInAC(stateDraft, action: PayloadAction<{ value: boolean }>) {
         stateDraft.isLoggedIn = action.payload.value;
      },
   },
});

export const authReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;

// thank
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
   dispatch(setAppStatusAC({ status: "loading" }));
   authAPI
      .login(data)
      .then((res) => {
         if (res.data.resultCode === TaskStatuses.New) {
            dispatch(setIsLoggedInAC({ value: true }));
            dispatch(setAppStatusAC({ status: "succeeded" }));
         } else {
            handleServerAppError(res.data, dispatch);
         }
      })
      .catch((error) => {
         handleServerNetworkError(error, dispatch);
      });
};
export const logoutTC = () => (dispatch: Dispatch) => {
   dispatch(setAppStatusAC({ status: "loading" }));
   authAPI
      .logout()
      .then((res) => {
         if (res.data.resultCode === TaskStatuses.New) {
            dispatch(setIsLoggedInAC({ value: false }));
            dispatch(setAppStatusAC({ status: "succeeded" }));
         } else {
            handleServerAppError(res.data, dispatch);
         }
      })
      .catch((error) => {
         handleServerNetworkError(error, dispatch);
      });
};
