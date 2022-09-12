import React from 'react';

import style from './Register.module.scss'

const Button = ({type="submit", text, disabled = true}) => {
    return (
        <button type={type} className={style.btn} disabled={!disabled}>{ text }</button>
    );
}

export default Button;
