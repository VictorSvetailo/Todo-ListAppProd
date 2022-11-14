import { setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT } from "../app/app-reduser";
import { ResponseType } from "../api/todoLists-api";
import { Dispatch } from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppStatusAT | SetAppErrorAT>) => {
   if (data.messages.length) {
      dispatch(setAppErrorAC({ error: data.messages[0] }));
   } else {
      dispatch(setAppErrorAC({ error: "Some Error" }));
   }
   dispatch(setAppStatusAC({ status: "failed" }));
};

export const handleServerNetworkError = (
   error: {
      message: string;
   },
   dispatch: Dispatch<SetAppStatusAT | SetAppErrorAT>
) => {
   dispatch(setAppErrorAC({ error: error.message ? error.message : "Some error occurred" }));
   dispatch(setAppStatusAC({ status: "failed" }));
};
