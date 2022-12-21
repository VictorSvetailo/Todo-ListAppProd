import {ImageType} from '../features/Photo-gallery/types';

export type GetGalleryType = {
    "total": number,
    "totalHits": number,
    "hits": Array<ImageType>
}