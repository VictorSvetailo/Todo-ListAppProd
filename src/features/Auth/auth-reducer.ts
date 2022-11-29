import {setAppStatusAC} from '../../app/app-reducer';
import {authAPI, FieldErrorType, LoginParamsType, TaskStatuses} from '../../api/todoLists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';


export const loginTC = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === TaskStatuses.New) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === TaskStatuses.New) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}));
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({})
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({})
    }
})

export const asyncActions = {
    loginTC,
    logoutTC,
}

export const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedInAC(stateDraft, action: PayloadAction<{ value: boolean }>) {
            stateDraft.isLoggedIn = action.payload.value;
        },
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
});

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;
