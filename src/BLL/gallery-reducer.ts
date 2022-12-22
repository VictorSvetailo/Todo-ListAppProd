import {galleryAPI} from '../api/gallery-api';
import {ImageType} from '../features/Photo-gallery/types';

export const imageInitState = {
    imageTotalCount: 0,
    imageTotalHitsCount: 0,
    images: [],
    currentPage: 1,
    perPage: 10,
    searchByColor: '',
    searchByLetter: '',
    // page: 1,
    // pageCount: 10,
    // packUserId: '',
    // error: null as null | string,
    // maxGrade: 10,
    // minGrade: 0,

    // currentCard: {
    //     _id: '',
    //     answer: '',
    //     question: '',
    // },

    // cardsParams: {
    //     cardAnswer: '',
    //     cardQuestion: '',
    //     cardsPack_id: '',
    //     min: 0,
    //     max: 0,
    //     sortCards: '0grade',
    //     page: 1,
    //     pageCount: 8,
    // },
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
            return { ...state, imageTotalCount: action.imageTotalCount};
        case 'TOTAL_HITS_IMAGE':
            return { ...state, imageTotalHitsCount: action.imageTotalHitsCount};
        case 'FETCH_IMAGE':
            return { ...state, images: action.images};
        case 'CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage};
        case 'SEARCH_COLOR':
            return { ...state, searchByColor: action.searchByColor};
        case 'SEARCH_LETTER':
            return { ...state, searchByLetter: action.searchByLetter};
        default:
            return state;
    }
};

export const totalImageAC = (imageTotalCount: number) =>
    ({ type: 'TOTAL_IMAGE', imageTotalCount } as const);
export const totalHitsImageAC = (imageTotalHitsCount: number) =>
    ({ type: 'TOTAL_HITS_IMAGE', imageTotalHitsCount } as const);
export const fetchImageAC = (images: Array<ImageType>) =>
    ({ type: 'FETCH_IMAGE', images } as const);
export const currentPageAC = (currentPage: number) =>
    ({ type: 'CURRENT_PAGE', currentPage } as const);
export const searchByLetterAC = (searchByLetter: string) =>
    ({ type: 'SEARCH_LETTER', searchByLetter } as const);
export const searchByColorAC = (searchByColor: string) =>
    ({ type: 'SEARCH_COLOR', searchByColor } as const);

export const fetchImageTC = (currentPage: number, perPage: number,
                             searchByColor: string, searchByLetter: string, searchByCategory: string) => (dispatch: any): any => {
    galleryAPI.getPhoto(currentPage, perPage, searchByColor, searchByLetter, searchByCategory)
        .then((res)=>{
            dispatch(totalImageAC(res.data.total))
            dispatch(totalHitsImageAC(res.data.totalHits))
            dispatch(fetchImageAC(res.data.hits))
        })
};

export type ImageActionsType =
    | ReturnType<typeof totalImageAC>
    | ReturnType<typeof totalHitsImageAC>
    | ReturnType<typeof fetchImageAC>
    | ReturnType<typeof currentPageAC>
    | ReturnType<typeof searchByLetterAC>
    | ReturnType<typeof searchByColorAC>

