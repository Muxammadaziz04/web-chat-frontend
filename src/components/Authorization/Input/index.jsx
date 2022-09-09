import React from 'react';

import style from './Input.module.scss'

const Input = ({text, placeholder, type, inputMode = 'text', name}) => {
    return (
        <label className={style.label}>
            {text}
            <input type={type} placeholder={placeholder} inputMode={inputMode} enterKeyHint="next" name={name} className={style.input}/>
        </label>
    );
}

export default Input;