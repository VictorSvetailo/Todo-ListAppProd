import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './Gallery.module.scss'
import {useAppDispatch} from '../../utils/redux-utils';
import {currentPageAC, fetchImageTC} from '../../BLL/gallery-reducer';
import {ImageType} from './types';
import {useAppSelector} from '../../app/store';
import {createPages} from './page-creator';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../Auth/selectors';
import Masonry from "react-responsive-masonry"

export const Gallery = () => {
    const imageTotalCount = useAppSelector<number>(state => state.gallery.imageTotalCount)
    const imageTotalHitsCount = useAppSelector<number>(state => state.gallery.imageTotalHitsCount)

    const currentPage = useAppSelector<number>(state => state.gallery.currentPage)
    const perPage = useAppSelector<number>(state => state.gallery.perPage)
    const searchLetter = useAppSelector<string>(state => state.gallery.searchByLetter)
    const pagesCount = Math.ceil(imageTotalCount / perPage)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const pages: Array<number> = []
    createPages(pages, pagesCount, currentPage)

    const dispatch = useAppDispatch()

    // const [photos, setPhotos] = useState([]);
    const [searchByLetter, setSearchByLetter] = useState(searchLetter);

    const searchByLetterH = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        let searchByLetter = e.currentTarget.value
        setSearchByLetter(searchByLetter)
    }

    const [searchByColor, setSearchByColor] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSearchByColor(event.target.value);
        console.log(event.target.value)
    };

    const [searchByCategory, setSearchByCategory] = React.useState('');

    const searchByCategoryH = (event: SelectChangeEvent) => {
        setSearchByCategory(event.target.value);
        console.log(event.target.value)
    };


    useEffect(() => {
        dispatch(fetchImageTC(currentPage, perPage, searchByColor, searchByLetter, searchByCategory))
    }, [currentPage, searchByColor, searchByLetter, searchByCategory]);


    const page = pages.map((p, index) => {
        return (
            <div key={index}
                 className={currentPage === p ? `${styles.pageBTN} ${styles.active}` : `${styles.pageBTN}`}>
                <button onClick={() => dispatch(currentPageAC(p))}>{p}</button>
            </div>
        )
    })

    if (!isLoggedIn) {
        console.log(isLoggedIn)
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.gallery__wrap}>
            <div className={styles.gallery__wrap2}>
                <div className={styles.gallery__header}>
                    <div>
                        <h2 className={styles.gallery__title}>Gallery</h2>
                    </div>
                    <div className={styles.gallery__menu}>
                        <input className={styles.gallery__menu_search} onChange={searchByLetterH}
                               placeholder={'Search..'}
                               type="text"/>
                        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                            <InputLabel id="demo-simple-select-standard-label">Search color</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={searchByColor}
                                onChange={handleChange}
                                label="SearchByColor"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'black'}>Black</MenuItem>
                                <MenuItem value={'white'}>White</MenuItem>
                                <MenuItem value={'silver'}>Silver</MenuItem>
                                <MenuItem value={`green`}>Green</MenuItem>
                                <MenuItem value={`purple`}>Purple</MenuItem>
                                <MenuItem value={`blue`}>Blue</MenuItem>
                                <MenuItem value={`yellow`}>Yellow</MenuItem>
                                <MenuItem value={`orange`}>Orange</MenuItem>
                                <MenuItem value={`red`}>Red</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                            <InputLabel id="demo-simple-select-standard-label">Search category</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={searchByCategory}
                                onChange={searchByCategoryH}
                                label="SearchByCategory"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'backgrounds'}>backgrounds</MenuItem>
                                <MenuItem value={'fashion'}>nature</MenuItem>
                                <MenuItem value={'science'}>Silver</MenuItem>
                                <MenuItem value={`education`}>education</MenuItem>
                                <MenuItem value={`feelings`}>feelings</MenuItem>
                                <MenuItem value={`health`}>health</MenuItem>
                                <MenuItem value={`people`}>people</MenuItem>
                                <MenuItem value={`religion`}>religion</MenuItem>
                                <MenuItem value={`places`}>places</MenuItem>
                                <MenuItem value={`animals`}>animals</MenuItem>
                                <MenuItem value={`industry`}>industry</MenuItem>
                                <MenuItem value={`computer`}>computer</MenuItem>
                                <MenuItem value={`food`}>food</MenuItem>
                                <MenuItem value={`sports`}>sports</MenuItem>
                                <MenuItem value={`transportation`}>transportation</MenuItem>
                                <MenuItem value={`travel`}>travel</MenuItem>
                                <MenuItem value={`buildings`}>buildings</MenuItem>
                                <MenuItem value={`business`}>business</MenuItem>
                                <MenuItem value={`music`}>music</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={styles.gallery__info}>
                        <h2>imageTotalCount: {imageTotalCount}</h2>
                        <h2>imageTotalHitsCount: {imageTotalHitsCount}</h2>
                    </div>
                </div>
                <div className={styles.gallery__main}>
                    <Image/>
                </div>
                <div className={styles.gallery__footer}>
                    <div className={styles.pageBTN__wrap}>
                        {page}
                    </div>
                </div>
            </div>
        </div>
    );
};


export const Image = () => {

    const images = useAppSelector<Array<ImageType>>(state => state.gallery.images)

    const [data, setData] = useState({img: '', imgId: 0});


    const viewImage = (img: string, imgId: number) => {
        // @ts-ignore
        console.log(img, imgId)
        // @ts-ignore
        setData({img, imgId})
    }

    return (
        <div>
            {
                data.img &&
                <div  style={{
                    width: "100%",
                    top: '0',
                    left: '0',
                    bottom: '0',
                    height: "100%",
                    background: 'black',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}>
                    <button  onClick={()=>setData({img: '', imgId: 0})} style={{position: 'absolute',  top: '100px', right: '40px', width: "30px",  zIndex: '3'}}>X</button>
                    <img src={data.img} alt="" style={{width: "auto", maxWidth: "90%", maxHeight: '90%', zIndex: '2'}}/>
                </div>
            }
            <Masonry columnsCount={3} gutter="10px">
                {images.map((image) => (
                    <img
                        key={image.id}
                        src={image.largeImageURL}
                        style={{width: "100%", display: "block", cursor: 'pointer'}}
                        onClick={()=>viewImage(image.largeImageURL, image.id)}
                    />
                ))}
            </Masonry>
        </div>
    );
}