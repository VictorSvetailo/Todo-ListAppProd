export const initialState: InitialStateType = {
    currentWindow: 'svs',
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

// export const applicationChangingThemeLocalStorageAC = (applicationChangingTheme: boolean) =>
//     ({ type: 'APP_SET_CHANGING_THEME_LOCAL_STORAGE', applicationChangingTheme } as const);

export type AppActionsType =
    | ReturnType<typeof applicationChangingThemeAC>
    | ReturnType<typeof currentWindowAC>
    // | ReturnType<typeof applicationChangingThemeLocalStorageAC>

