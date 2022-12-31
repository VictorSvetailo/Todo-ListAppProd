import {useAppSelector} from '../../../app/store';
import {fetchProfileTC, ProfileItemsType} from '../../../BLL/social-network-reducer';
import {useAppDispatch} from '../../../utils/redux-utils';
import React, {useEffect, useState} from 'react';
import styles from './social-network-profile.module.scss';
import photoIcon from '../../../assets/icons/social-network-icons/photo-icon.svg'
import addIcon from '../../../assets/icons/social-network-icons/add-circle-icon.svg'
import writeIcon from '../../../assets/icons/social-network-icons/write-icon.svg'
import {Button} from '../assets/Button/Button';
import {NavLink, Outlet, Route, Routes} from 'react-router-dom';
import {currentWindowAC} from '../../../BLL/application-reducer';
import {Error} from '../../../components/Error/Error';
import {Gallery} from '../../Photo-gallery/Gallery';
import {SocialNetwork} from '../Social-Network';
import {Settings} from '../../Settings/Settings';
import {Background} from '../../Settings/Background/Background';
import {Templates} from '../../../components/Menu/Templates/Templates';
import {TodoListsList} from '../../TodoListsList';
import {Login} from '../../Auth';
import {About} from '../About/About';
import {Posts} from '../Posts/Posts';
import {Friends} from '../Friends/Friends';
import {Photos} from '../Photos/Photos';
import {Videos} from '../Videos/Videos';
import {Chat} from '../Chat/Chat';


export const SocialNetworkProfile = () => {
    let location = document.location.pathname;
    const profile = useAppSelector<ProfileItemsType | null>(store => store.socialNetwork.profile)
    const dispatch = useAppDispatch()

    const coverPhoto = false

    const userID = 24789
    useEffect(() => {
        dispatch(fetchProfileTC(userID))
    }, [])
    const [isActiveBTN, setIsActiveBTN] = useState(location)
    // console.log(location)
    const isActiveBTNCB = (value: string) => {
        setIsActiveBTN(value)
    }

    if (!profile) {
        return profile
    }
    return (
        <div className={styles.social__wrap}>
            <div className={styles.social__header}>
                <div className={styles.social__cover}>
                    {coverPhoto && <img className={styles.social__cover_image} src="" alt=""/>}
                    <div className={styles.social__cover_button}>
                        <Button icon={photoIcon} text={'Add Cover Photo'} background={'#fff'}/>
                    </div>
                </div>
                <div className={styles.social__personal__settings}>
                    <div className={styles.social__personal__photo_wrap}>
                        <div className={styles.social__personal__photo}>
                            <img src={profile.photos.large || 'https://inlnk.ru/4y0VkP'} alt=""/>
                        </div>
                        <div className={styles.social__personal__photo_change}>
                            <img src={photoIcon} alt=""/>
                        </div>
                    </div>
                    <div className={styles.social__personal_name}>
                        <div>{profile.fullName}</div>
                    </div>
                    <div className={styles.social__personal_button}>
                        <Button icon={addIcon} text={'Add to Story'} color={'#fff'} background={'#1b74e4'}/>
                        <Button icon={writeIcon} text={'Edit profile'} background={'#e4e6eb'}/>
                    </div>
                </div>
            </div>
            <div className={styles.social__main}>
                <div className={styles.social__main_wrap}>
                    <div className={styles.social__main_items}>
                        <NavLink to={'/social-network/posts'}>
                            <button onClick={() => isActiveBTNCB('/social-network/posts')}
                                    className={isActiveBTN === '/social-network/posts' ? `${styles.social__main_btn} ${styles.active}` : `${styles.social__main_btn}`}>Posts
                            </button>
                        </NavLink>
                        <NavLink to={'/social-network/about'}>
                            <button onClick={() => isActiveBTNCB('/social-network/about')}
                                    className={isActiveBTN === '/social-network/about' ? `${styles.social__main_btn} ${styles.active}` : `${styles.social__main_btn}`}>About
                            </button>
                        </NavLink>
                        <NavLink to={'/social-network/friends'}>
                            <button onClick={() => isActiveBTNCB('/social-network/friends')}
                                    className={isActiveBTN === '/social-network/friends' ? `${styles.social__main_btn} ${styles.active}` : `${styles.social__main_btn}`}>Friends
                            </button>
                        </NavLink>
                        <NavLink to={'/social-network/photos'}>
                            <button onClick={() => isActiveBTNCB('/social-network/photos')}
                                    className={isActiveBTN === '/social-network/photos' ? `${styles.social__main_btn} ${styles.active}` : `${styles.social__main_btn}`}>Photos
                            </button>
                        </NavLink>
                        <NavLink to={'/social-network/videos'}>
                            <button onClick={() => isActiveBTNCB('/social-network/videos')}
                                    className={isActiveBTN === '/social-network/videos' ? `${styles.social__main_btn} ${styles.active}` : `${styles.social__main_btn}`}>Videos
                            </button>
                        </NavLink>
                        <NavLink to={'/social-network/chat'}>
                            <button onClick={() => isActiveBTNCB('/social-network/chat')}
                                    className={isActiveBTN === '/social-network/chat' ? `${styles.social__main_btn} ${styles.active}` : `${styles.social__main_btn}`}>Chat
                            </button>
                        </NavLink>
                    </div>
                    <div className={styles.social__main__content}>
                        <div className={styles.social__main__settings}>
                            |||
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.social__footer}>

            </div>
            {/*<div>{profile.lookingForAJob}</div>*/}

            {/*<div>{profile.lookingForAJobDescription}</div>*/}

            {/*<div>{profile.contacts.facebook}</div>*/}
            {/*<div>{profile.contacts.github}</div>*/}
            {/*<div>{profile.contacts.vk}</div>*/}
            {/*<div>{profile.contacts.instagram}</div>*/}
            {/*<div>{profile.contacts.twitter}</div>*/}
            {/*<div>{profile.contacts.mainLink}</div>*/}
            {/*<div>{profile.contacts.website}</div>*/}
            {/*<div>{profile.contacts.youtube}</div>*/}
        </div>


    );
};