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

        // case 'CARDS/UPDATE_PARAMS_CARDS': {
        //     return { ...state, cardsParams: { ...state.cardsParams, ...action.params } };
        // }
        // case 'CARDS/SET_CURRENT_CARD': {
        //     return state;
        // }
        // case 'CARD/SET_UPDATED_CARD_GRADE': {
        //     return {
        //         ...state,
        //         cards: state.cards.map(card =>
        //             card._id === action.gradeData.cardId
        //                 ? {
        //                     ...card,
        //                     grade: action.gradeData.grade,
        //                 }
        //                 : card,
        //         ),
        //     };
        // }
        // case 'CARDS/SET_ERROR':
        //     return state;;
        // case 'CARDS/SET_SEARCH_BY_QUESTION':
        //     return { ...state, cardsParams: { ...state.cardsParams, cardQuestion: action.value } };
        // case 'CARDS/SET_SORT_CARDS':
        //     return { ...state, cardsParams: { ...state.cardsParams, sortCards: action.value } };

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

// export const updateParamsCards = (params: any) =>
//     ({ type: 'CARDS/UPDATE_PARAMS_CARDS', params } as const);
//
// export const setSearchCardsByQuestion = (value: string) =>
//     ({ type: 'CARDS/SET_SEARCH_BY_QUESTION', value } as const);
//
// export const setCurrentCard = (card: { _id: string; answer: string; question: string }) =>
//     ({ type: 'CARDS/SET_CURRENT_CARD', card } as const);
//
// export const loadingCards = (isLoading: boolean) =>
//     ({ type: 'CARDS/IS_LOADING', isLoading } as const);
//
// export const setSortCards = (value: string) => ({ type: 'CARDS/SET_SORT_CARDS', value } as const);
//
// export const setError = (error: string | null) => ({ type: 'CARDS/SET_ERROR', error } as const);
//
// export const setUpdatedCardGrade = (gradeData: { cardId: string | undefined; grade: number }) =>
//     ({ type: 'CARD/SET_UPDATED_CARD_GRADE', gradeData } as const);

export const fetchImageTC = (currentPage: number, perPage: number,
                             searchByColor: string, searchByLetter: string, searchByCategory: string) => (dispatch: any): any => {
    console.log('hello')
    galleryAPI.getPhoto(currentPage, perPage, searchByColor, searchByLetter, searchByCategory)
        .then((res)=>{
            dispatch(totalImageAC(res.data.total))
            dispatch(totalHitsImageAC(res.data.totalHits))
            dispatch(fetchImageAC(res.data.hits))
            console.log(res.data.hits)
        })
};

// export const fetchImageTC = (currentPage: number, perPage: number) => (dispatch: any): any => {
//     galleryAPI.getPhoto(currentPage, perPage)
//         .then((res)=>{
//             dispatch(totalImageAC(res.data.total))
//             console.log(res.data.hits)
//         })
// };


export const getImage1 = (): any => {
    // return (dispatch, getState) => {
    //     dispatch(setIsLoading(true));
    //     const { cardsParams } = getState().cards;
    //     cardsAPI
    //         .getCards(cardsParams)
    //         .then(res => {
    //             dispatch(setCards(res.data));
    //         })
    //         .finally(() => {
    //             dispatch(setIsLoading(false));
    //         });
    // };
};



export const createRequestCard = (data: any): any => {
    // return dispatch => {
    //     cardsAPI.createCards(data).then(() => {
    //         dispatch(getRequestCards());
    //     });
    // };
};

export const deleteRequestCard = (cardId: string): any => {
    // return dispatch => {
    //     cardsAPI.deleteCards(cardId).then(() => {
    //         dispatch(getRequestCards());
    //     });
    // };
};

export const updateGradeRequest = (cardId: string, grade: number): any => {
    // return dispatch => {
    //     dispatch(setIsLoading(true));
    //     cardsAPI.gradeCard(cardId, grade).then(() => {
    //         dispatch(setUpdatedCardGrade({ cardId, grade }));
    //         dispatch(setIsLoading(false));
    //     });
    // };
};

export type ImageActionsType =
    | ReturnType<typeof totalImageAC>
    | ReturnType<typeof totalHitsImageAC>
    | ReturnType<typeof fetchImageAC>
    | ReturnType<typeof currentPageAC>
    | ReturnType<typeof searchByLetterAC>
    | ReturnType<typeof searchByColorAC>

