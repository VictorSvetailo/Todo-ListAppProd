import React, {FC} from 'react';
import styles from './Button.module.scss'
import photoIcon from '../../../../assets/icons/social-network-icons/photo-icon.svg';



type ButtonType = {
    icon?: string
    text: string
    color?: string
    background?: string
    width?: string
}



export const Button: FC<ButtonType> = ({icon, text, color, background, width}) => {

    return (
        <button style={{color: color, background: background, width: width}} className={styles.button}>
            <img className={styles.button__icon} src={icon} alt=""/>
            <div className={styles.button__text}>{text}</div>
        </button>
    );
}