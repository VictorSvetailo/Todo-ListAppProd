import {appReducer, InitialStateType, setErrorAC, setStatusAC} from './app-reduser';


let startState: InitialStateType
beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
    }
})


test('correct error message should be set', () => {

    const endState = appReducer(startState, setErrorAC('Some error'))
    expect(endState.error).toBe('Some error')
})


test('correct status message should be set', () => {

    const endState = appReducer(startState, setStatusAC('loading'))
    expect(endState.status).toBe('loading')
})