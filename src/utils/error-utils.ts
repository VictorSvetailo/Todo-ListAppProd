import {setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from '../app/app-reduser';
import {ResponseType} from '../api/todoLists-api';
import {Dispatch} from 'redux';



export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppStatusAT | SetAppErrorAT>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some Error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<SetAppStatusAT | SetAppErrorAT>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}


