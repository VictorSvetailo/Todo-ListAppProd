import {authAPI} from '../api/todoLists-api';
import {setIsLoggedInAC} from '../features/Auth/auth-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';



const isInitializeAppTC = createAsyncThunk('auth/initializeApp', async (param, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value: true}));
    } else {
        //in development
    }
})


export const asyncActions = {
    isInitializeAppTC
}


const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {
        setAppStatusAC(stateDraft, action: PayloadAction<{ status: RequestStatusType }>) {
            stateDraft.status = action.payload.status;
        },
        setAppErrorAC(stateDraft, action: PayloadAction<{ error: string | null }>) {
            stateDraft.error = action.payload.error;
        },
    },
    extraReducers: builder => {
        builder.addCase(isInitializeAppTC.fulfilled, (state, action) => {
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer;
export const {setAppStatusAC, setAppErrorAC} = slice.actions;


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

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
