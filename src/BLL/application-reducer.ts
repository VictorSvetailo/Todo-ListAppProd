
export const appInitState = {
    applicationChangingTheme: false,
};

export type AppStateType = {
    applicationChangingTheme: boolean,
}

export const applicationReducer = (state: AppStateType = appInitState, action: AppActionsType,): AppStateType => {
    switch (action.type) {
        case 'APP_CHANGING_THEME':
            return {...state, applicationChangingTheme: !state.applicationChangingTheme};
        case 'APP_SET_CHANGING_THEME_LOCAL_STORAGE':
            return {...state, applicationChangingTheme: action.applicationChangingTheme};
        default:
            return state;
    }
};

export const applicationChangingThemeAC = () =>
    ({ type: 'APP_CHANGING_THEME'} as const);

export const applicationChangingThemeLocalStorageAC = (applicationChangingTheme: boolean) =>
    ({ type: 'APP_SET_CHANGING_THEME_LOCAL_STORAGE', applicationChangingTheme } as const);

export type AppActionsType =
    | ReturnType<typeof applicationChangingThemeAC>
    | ReturnType<typeof applicationChangingThemeLocalStorageAC>

