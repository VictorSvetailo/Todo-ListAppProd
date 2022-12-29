export const initialState: InitialStateType = {
    currentWindow: '/',
    applicationChangingTheme: false,
};

export type InitialStateType = {
    applicationChangingTheme: boolean,
    currentWindow: string
}

export const applicationReducer = (state: InitialStateType = initialState, action: AppActionsType,): InitialStateType => {
    switch (action.type) {
        case 'APP_CHANGING_THEME':
            return {...state, applicationChangingTheme: !state.applicationChangingTheme};
        case 'CURRENT_WINDOW':
            return {...state, currentWindow: action.value};
        default:
            return state;
    }
};

export const applicationChangingThemeAC = () =>
    ({ type: 'APP_CHANGING_THEME'} as const);
export const currentWindowAC = (value: string) =>
    ({ type: 'CURRENT_WINDOW', value} as const);


export const currentWindowTC = () => (dispatch: any) => {
    let location = document.location.pathname;
    dispatch(currentWindowAC(location))
}

export type AppActionsType =
    | ReturnType<typeof applicationChangingThemeAC>
    | ReturnType<typeof currentWindowAC>
    // | ReturnType<typeof applicationChangingThemeLocalStorageAC>

