import {appActions} from '../features/CommanActions/AppActions';

import {ThunkAPIType} from './types';
import {ResponseType} from '../api/types';

const {setAppStatus, setAppError} = appActions
// Async
export const handleAsyncServerAppError = <D>(data: ResponseType<D>, thunkAPI: ThunkAPIType,
                                             showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Some Error'}));
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}));
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
};


export const handleAsyncServerNetworkError = (
    error: { message: string; }, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppError({error: error.message ? error.message : 'Some error occurred'}));
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}));
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
};

