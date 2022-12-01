
import {authAPI} from '../../api/todoLists-api';
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {FieldErrorType, LoginParamsType, TaskStatuses} from '../../api/types';
import {appActions} from '../CommanActions/AppActions';



const {setAppStatus} = appActions

export const login = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === TaskStatuses.New) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
})

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === TaskStatuses.New) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

export const asyncActions = {
    login,
    logout,
}

export const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedIn(stateDraft, action: PayloadAction<{ value: boolean }>) {
            stateDraft.isLoggedIn = action.payload.value;
        },
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
});

// export const authReducer = slice.reducer;
// export const {setIsLoggedIn} = slice.actions;
