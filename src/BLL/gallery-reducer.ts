import {galleryAPI} from '../DAL/Gallery-DAL/gallery-api';
import {ImageType} from '../features/Photo-gallery/types';
import {appActions} from '../features/CommanActions/AppActions';

const {setAppStatus} = appActions
export const imageInitState = {
    imageTotalCount: 0,
    imageTotalHitsCount: 0,
    images: [],
    currentPage: 1,
    perPage: 20,
    searchByColor: '',
    searchByLetter: '',
};

export type ImageStateType = {
    imageTotalCount: number,
    imageTotalHitsCount: number,
    images: Array<ImageType>,
    currentPage: number
    perPage: number
    searchByColor: string
    searchByLetter: string
}

export const galleryReducer = (state: ImageStateType = imageInitState, action: ImageActionsType,): ImageStateType => {
    switch (action.type) {
        case 'TOTAL_IMAGE':
            return {...state, imageTotalCount: action.imageTotalCount};
        case 'TOTAL_HITS_IMAGE':
            return {...state, imageTotalHitsCount: action.imageTotalHitsCount};
        case 'FETCH_IMAGE':
            return {...state, images: action.images};
        case 'CURRENT_PAGE':
            return {...state, currentPage: action.currentPage};
        case 'SEARCH_COLOR':
            return {...state, searchByColor: action.searchByColor};
        case 'SEARCH_LETTER':
            return {...state, searchByLetter: action.searchByLetter};
        default:
            return state;
    }
};

export const totalImageAC = (imageTotalCount: number) =>
    ({type: 'TOTAL_IMAGE', imageTotalCount} as const);
export const totalHitsImageAC = (imageTotalHitsCount: number) =>
    ({type: 'TOTAL_HITS_IMAGE', imageTotalHitsCount} as const);
export const fetchImageAC = (images: Array<ImageType>) =>
    ({type: 'FETCH_IMAGE', images} as const);
export const currentPageAC = (currentPage: number) =>
    ({type: 'CURRENT_PAGE', currentPage} as const);
export const searchByLetterAC = (searchByLetter: string) =>
    ({type: 'SEARCH_LETTER', searchByLetter} as const);
export const searchByColorAC = (searchByColor: string) =>
    ({type: 'SEARCH_COLOR', searchByColor} as const);

export const fetchImageTC = (currentPage: number, perPage: number,
                             searchByColor: string, searchByLetter: string, searchByCategory: string) => (dispatch: any): any => {
    galleryAPI.getPhoto(currentPage, perPage, searchByColor, searchByLetter, searchByCategory)
        .then((res) => {
            dispatch(setAppStatus({status: 'loading'}))
            dispatch(totalImageAC(res.data.total))
            dispatch(totalHitsImageAC(res.data.totalHits))
            dispatch(fetchImageAC(res.data.hits))
            if (res.data.hits.length){
                setTimeout(()=>{
                    dispatch(setAppStatus({ status: 'succeeded' }))
                },2000)
            }
        })

};


export type ImageActionsType =
    | ReturnType<typeof totalImageAC>
    | ReturnType<typeof totalHitsImageAC>
    | ReturnType<typeof fetchImageAC>
    | ReturnType<typeof currentPageAC>
    | ReturnType<typeof searchByLetterAC>
    | ReturnType<typeof searchByColorAC>

