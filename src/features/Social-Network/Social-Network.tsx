import React, {useEffect} from 'react';
import styles from './social-network.module.scss'
import {socialNetworkAPI} from '../../api/social-network';
import {fetchProfileTC, fetchUsersTC, ProfileItemsType} from '../../BLL/social-network-reducer';
import {useAppDispatch} from '../../utils/redux-utils';
import {useAppSelector} from '../../app/store';

export const SocialNetwork = () => {

    return (
        <div>
            <SocialNetworkProfile/>
            <SocialNetworkUsers/>
        </div>
    )

}

export const SocialNetworkProfile = () => {

    const profile = useAppSelector<ProfileItemsType | null>(store => store.socialNetwork.profile)
    const dispatch = useAppDispatch()




    const userID = 24789
    useEffect(()=>{
        dispatch(fetchProfileTC(userID))
    }, [])


    if (!profile) {
        return profile
    }
    return (
        <div className={styles.social}>
            <h1>Hello Profile</h1>

            <img src={profile.photos.large || 'https://inlnk.ru/4y0VkP'} alt=""/>
            <div>{profile.lookingForAJob}</div>
            <div>{profile.fullName}</div>
            <div>{profile.lookingForAJobDescription}</div>
            <hr/>
            <div>{profile.contacts.facebook}</div>
            <div>{profile.contacts.github}</div>
            <div>{profile.contacts.vk}</div>
            <div>{profile.contacts.instagram}</div>
            <div>{profile.contacts.twitter}</div>
            <div>{profile.contacts.mainLink}</div>
            <div>{profile.contacts.website}</div>
            <div>{profile.contacts.youtube}</div>
        </div>
    );
};



export const SocialNetworkUsers = () => {

    const users = useAppSelector(store => store.socialNetwork.users)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchUsersTC())
    }, [])

    const usersUI = users.map((u: any) => {
        return (
            <div key={u.id}>
                <img src={u.photos.large} alt=""/>
                <div>{u.name}</div>
                <div>{u.status}</div>
                <div>{u.followed}</div>
            </div>
        )
    })

    return (
        <div className={styles.social}>
            <h1>Hello Profile</h1>
            {usersUI}
        </div>
    );
};
