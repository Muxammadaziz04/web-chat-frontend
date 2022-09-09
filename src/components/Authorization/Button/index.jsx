import React from 'react';

import style from './Register.module.scss'

const Button = ({type="submit", text}) => {
    return (
        <button type={type} className={style.btn}>{ text }</button>
    );
}

export default Button;
