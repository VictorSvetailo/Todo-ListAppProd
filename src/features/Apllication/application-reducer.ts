import {authAPI} from '../../api/todoLists-api';
import {authActions} from '../Auth';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {appActions} from '../CommanActions/AppActions';



const {setAppStatus, setAppError} = appActions
const {setIsLoggedIn} = authActions

const isInitializeApp = createAsyncThunk('application/initializeApp', async (param, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}));
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({value: true}));
    } else {
        //in development
    }
})


export const asyncActions = {
    isInitializeApp
}


export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(isInitializeApp.fulfilled, (state, action) => {
            state.isInitialized = true
        })
            .addCase(setAppStatus, (state, action) => {
                state.status = action.payload.status;
            })
            .addCase(setAppError, (state, action) => {
                state.error = action.payload.error;
            })
    }
})
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType;
    // если ошибка какая-то глобальная произойдет - мы запишем ошибки сюда
    error: string | null;
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и тд)
    isInitialized: boolean;
};
