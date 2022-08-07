import React from 'react';

import letterIcon from '../../../Assets/choose_msg.png'

import style from './DefaultMessageComponent.module.scss'

const DefaultMessageComponent = () => {
    return (
        <div className={style.container}>
            <img src={letterIcon} alt="icon" />
            <p>Select a chat to start messaging</p>
        </div>
    );
}

export default DefaultMessageComponent;
