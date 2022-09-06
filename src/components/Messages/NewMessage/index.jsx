import React from 'react';

import style from './NewMesage.module.scss'

const NewMessage = () => {
    return (
        <span className={style.new_message}>
            <span></span>
            <p className={style.new_message_text}>New Message</p>
            <span></span>
        </span>
    );
}

export default NewMessage;
