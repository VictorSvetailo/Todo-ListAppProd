import axios from 'axios';
import {GetGalleryType} from './types-gallery';

const galleryInstance = axios.create({
    baseURL: 'https://pixabay.com/api',
});

export const galleryAPI = {
    getPhoto(currentPage: number, perPage: number, searchByColor: string, searchByLetter: string, searchByCategory: string) {
        console.log(searchByCategory)
        return galleryInstance.get<GetGalleryType>('/', {
            params: {
                q: `${searchByColor}+${searchByLetter}`,
                key: '32233879-a5e5e1e253c0e82bd7e930f04',
                page: currentPage,
                per_page: perPage,
                image_type: 'all',
                category: searchByCategory
            }
        })
    },
};
