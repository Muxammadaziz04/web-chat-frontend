import React from 'react';

import style from './Input.module.scss'

const Input = ({text, placeholder, type, inputMode = 'text', name, register, errors}) => {
    return (
        <label className={style.label}>
            {text}
            <input 
                type={type} 
                placeholder={placeholder} 
                inputMode={inputMode} 
                enterKeyHint="next" 
                name={name} 
                {...register} 
                className={style.input}
            />
            {errors && errors[name] && <span>{errors[name]?.message || "Error"}</span>}
        </label>
    );
}

export default Input;