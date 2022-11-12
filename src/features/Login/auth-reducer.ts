import { AppActionsType } from "../../app/store";
import { SetAppErrorAT, setAppStatusAC, SetAppStatusAT } from "../../app/app-reduser";
import { Dispatch } from "redux";
import { authAPI, LoginParamsType, TaskStatuses } from "../../api/todoLists-api";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";

export const authReducer = (state: LoginStateType = initialState, action: LoginActionType): LoginStateType => {
   switch (action.type) {
      case "login/SET_IS_LOGGED_IN":
         return {
            ...state,
            isLoggedIn: action.value,
         };
      case "login/SET_IS_LOGOUT_IN":
         return {
            ...state,
            isLoggedIn: action.value,
         };
      default:
         return state;
   }
};

// actions
export const setIsLoggedInAC = (value: boolean) => ({ type: "login/SET_IS_LOGGED_IN", value } as const);
export const setIsLogoutInAC = (value: boolean) => ({ type: "login/SET_IS_LOGOUT_IN", value } as const);

// thank
export const loginTC = (data: LoginParamsType) => (dispatch: LoginDispatch) => {
   dispatch(setAppStatusAC("loading"));
   authAPI
      .login(data)
      .then((res) => {
         if (res.data.resultCode === TaskStatuses.New) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC("succeeded"));
         } else {
            handleServerAppError(res.data, dispatch);
         }
      })
      .catch((error) => {
         handleServerNetworkError(error, dispatch);
      });
};
export const logoutTC = () => (dispatch: LoginDispatch) => {
   dispatch(setAppStatusAC("loading"));
   authAPI
       .logout()
       .then((res) => {
          if (res.data.resultCode === TaskStatuses.New) {
             dispatch(setIsLogoutInAC(false));
             dispatch(setAppStatusAC("succeeded"));
          } else {
             handleServerAppError(res.data, dispatch);
          }
       })
       .catch((error) => {
          handleServerNetworkError(error, dispatch);
       });
};

// - types -
export type LoginActionType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsLogoutInAC>

const initialState: LoginStateType = {
   isLoggedIn: false,
};
type LoginStateType = {
   isLoggedIn: boolean;
};

export type LoginDispatch = Dispatch<AppActionsType | SetAppStatusAT | SetAppErrorAT>;
