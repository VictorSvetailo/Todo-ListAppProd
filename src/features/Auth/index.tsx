import * as authSelectors from './selectors'
import {Login} from './Login'
import {asyncActions, slice} from './auth-reducer'


const authActions = {
    ...asyncActions,
    ...slice.actions
}

const authReducer = slice.reducer


export {
    authSelectors,
    authActions,
    authReducer,
    Login,
}