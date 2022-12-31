import React, {useEffect, useState} from 'react';
import styles from './posts.module.scss'
import {useAppSelector} from '../../../app/store';
import {useAppDispatch} from '../../../utils/redux-utils';
import {fetchUsersTC, ProfileItemsType} from '../../../BLL/social-network-reducer';
import avatarImage from '../../../assets/image/social-network/avatar.jpeg'
import addFriendImage from '../../../assets/icons/social-network-icons/user-add-icon.svg'
import {Button} from '../assets/Button/Button';


export const Posts = () => {
    const profile = useAppSelector<ProfileItemsType | null>(store => store.socialNetwork.profile)
    const users = useAppSelector(store => store.socialNetwork.users)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchUsersTC())
    }, [])


    const [modeIsActive, setModeIsActive ] = useState(false)

    const buttonSwitchH = () => {
        setModeIsActive(!modeIsActive)
    }


    const usersUI = users.map((u: any) => {
        return (
            <div key={u.id}>
                <div className={styles.posts__slider_item}>
                    <div className={styles.slider__item_image}>
                        <img src={u.photos.large || avatarImage} alt=""/>
                    </div>
                    <div className={styles.slider__items}>
                        <div className={styles.slider__item_name}>
                            <div>{u.name}</div>
                        </div>
                        <div className={styles.slider__item_subscription}>
                            <Button icon={addFriendImage} text={'Add friend'} color={'#1878f2'} background={'#e7f3ff'}
                                    width={'100%'}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className={styles.posts}>
            <div className={styles.posts__wrap}>
                <div className={styles.posts__slider_wrap}>
                    <div className={styles.posts__slider_body}>
                        <h2 className={styles.posts__slider_title}>People you may know</h2>
                        <div className={styles.posts__slider}>
                            <div className={styles.posts__slider_scroll}>
                                {usersUI}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.posts__data}>
                    <div className={styles.posts__info_body}>
                        <div className={styles.posts__info_info}>
                            <div className={styles.posts__info}>
                                <h2 className={styles.posts__info_title}>Intro</h2>
                                <div className={styles.posts__info_items}>
                                    <div className={styles.posts__info_addbio}>
                                        { !modeIsActive
                                            ? <button className={styles.posts__info_btn} onClick={buttonSwitchH}>Add Bio</button>
                                            : <input type="text"/>
                                        }
                                    </div>
                                    <div className={styles.posts__info_ditdetails}>
                                        <button className={styles.posts__info_btn} onClick={buttonSwitchH}>Add details</button>
                                    </div>
                                    <div className={styles.posts__info_addhobbies}>
                                        <button className={styles.posts__info_btn} onClick={buttonSwitchH}>Add Hobbies</button>
                                    </div>
                                    <div className={styles.posts__info_addfeatured}>
                                        <button className={styles.posts__info_btn} onClick={buttonSwitchH}>Add Featured</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.posts__info_box}>
                            <h2 className={styles.posts__info_title}>Photos</h2>
                            <button>See All Photos</button>
                        </div>
                        <div className={styles.posts__info_box}>
                            <h2 className={styles.posts__info_title}>Friend</h2>
                            <button>See All Friends</button>
                        </div>
                    </div>
                    <div className={styles.posts__data_message}>
                        <div className={styles.posts__data_message_create_body}>
                            <div className={styles.posts__data_message_create_avatar}>
                                <img src={profile?.photos.large || avatarImage} alt=""/>
                            </div>
                            <div className={styles.posts__data_message_create}>
                                <input type="text" placeholder={'What\'s on your mind?'}/>
                            </div>
                            <div onClick={buttonSwitchH} className={styles.posts__data_message_button}>
                                <Button text={'Add'}/>
                            </div>
                        </div>
                        <div className={styles.posts__data_posts}>
                            <div className={styles.posts__data_box}>
                                <div className={styles.posts__data_message_create_avatar}>
                                    <img src={profile?.photos.large || avatarImage} alt=""/>
                                </div>
                                <div className={styles.posts__data_items}>
                                    <h2>{profile?.fullName}</h2>
                                    <div>12:30</div>
                                </div>

                            </div>
                            <div className={styles.posts__data_posts_message}>
                                <div className={styles.posts__data_posts}>
                                    Hello! I am Victor!
                                </div>
                                <div className={styles.posts__data_posts_additionally}>
                                    <div className={styles.posts__additionally_item}>
                                        Like
                                    </div>
                                    <div className={styles.posts__additionally_item}>
                                        Comment
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
