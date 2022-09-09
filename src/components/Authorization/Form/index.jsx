import React from 'react';

import style from './Form.module.scss'

const Form = ({ children, onSubmit, ref }) => {
    return (
        <form className={style.form} onSubmit={onSubmit} ref={ref}>
            { children }
        </form>
    );
}

export default Form;
