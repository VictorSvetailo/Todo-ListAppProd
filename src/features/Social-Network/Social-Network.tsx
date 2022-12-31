import React, {useEffect} from 'react';
import styles from './social-network.module.scss'
import {fetchUsersTC} from '../../BLL/social-network-reducer';
import {useAppDispatch} from '../../utils/redux-utils';
import {useAppSelector} from '../../app/store';
import {SocialNetworkProfile} from './Profile/SocialNetworkProfile';

export const SocialNetwork = () => {

    return (
        <div>
            <div className={styles.social}>
                <SocialNetworkProfile/>
                {/*<SocialNetworkUsers/>*/}
            </div>
        </div>
)

}


export const SocialNetworkUsers = () => {

    const users = useAppSelector(store => store.socialNetwork.users)
    const dispatch = useAppDispatch()

    useEffect(() => {
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
