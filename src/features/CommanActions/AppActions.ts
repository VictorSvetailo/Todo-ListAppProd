import {RequestStatusType} from '../Apllication/application-reducer';
import {createAction} from '@reduxjs/toolkit';


const setAppStatus = createAction<{ status: RequestStatusType }>('common/setAppStatus')
const setAppError = createAction<{ error: string | null }>('common/setAppError')


export const appActions = {
    setAppStatus,
    setAppError
}
