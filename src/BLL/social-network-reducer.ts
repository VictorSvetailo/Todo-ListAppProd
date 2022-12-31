import {socialNetworkAPI} from '../DAL/Social-network-DAL/social-network';

export const initialState: InitialStateType = {
    users: [],
    profile: null as ProfileItemsType | null,
}

export type InitialStateType = {
    users: Array<any>
    profile: ProfileItemsType | null
}

export const socialNetworkReducer = (state: InitialStateType = initialState, action: AppActionsType,): InitialStateType => {
    switch (action.type) {
        case 'FETCH_USERS':
            return {...state, users: action.users};
        case 'FETCH_PROFILE':
            return {...state, profile: action.profile};
        default:
            return state;
    }
};

export const fetchUsersAC = (users: Array<any>) =>
    ({type: 'FETCH_USERS', users} as const);
export const fetchProfileAC = (profile: any) =>
    ({type: 'FETCH_PROFILE', profile} as const);


// export const currentWindowAC = (value: string) =>
//     ({ type: 'CURRENT_WINDOW', value} as const);


export const fetchUsersTC = () => (dispatch: any) => {
    socialNetworkAPI.getUsers()
        .then(res => {
            // @ts-ignore
            dispatch(fetchUsersAC(res.data.items))
        })
}

export const fetchProfileTC = (userID: number) => (dispatch: any) => {
    socialNetworkAPI.getProfile(userID)
        .then(res => {
            // @ts-ignore
            dispatch(fetchProfileAC(res.data))
            // @ts-ignore
            // console.log(res.data)
        })
}


export type AppActionsType =
    | ReturnType<typeof fetchUsersAC>
    | ReturnType<typeof fetchProfileAC>
// | ReturnType<typeof applicationChangingThemeLocalStorageAC>


export type ProfileItemsType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileContactsType
    photos: ProfilePhotosType
}
export type ProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfilePhotosType = {
    small: string | null
    large: string | null
}

