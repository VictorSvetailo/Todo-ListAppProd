import {setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from '../app/app-reducer';
import {ResponseType} from '../api/todoLists-api';
import {Dispatch} from 'redux';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppStatusAT | SetAppErrorAT>,
                                        showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC({error: data.messages.length ? data.messages[0] : 'Some Error'}));
    }
    dispatch(setAppStatusAC({status: 'failed'}));
};

export const handleServerNetworkError = (
    error: {
        message: string;
    },
    dispatch: Dispatch<SetAppStatusAT | SetAppErrorAT>, showError = true
) => {
    if (showError) {
        dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}));
    }
    dispatch(setAppStatusAC({status: 'failed'}));
};


export const handleAsyncServerNetworkError = (
    error: { message: string; }, thunkAPI: any, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}));
    }
    thunkAPI.dispatch(setAppStatusAC({status: 'failed'}));
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
};

