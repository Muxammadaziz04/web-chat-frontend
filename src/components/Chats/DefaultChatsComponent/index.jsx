import React from 'react';

import PersonsIcon from '../../../Assets/noun-two-people.svg'

import style from './DeafultChatsComponent.module.scss'

const DeafultChatsComponent = () => {
    return (
        <div className={style.block}>
            <img src={PersonsIcon} alt="icon" />
            <p>Welcome to chat</p>
        </div>
    );
}

export default DeafultChatsComponent;
