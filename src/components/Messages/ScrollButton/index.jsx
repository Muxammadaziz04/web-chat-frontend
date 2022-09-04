import React from 'react';

import arrowIcon from '../../../Assets/arrow.svg'

import style from './ScrollButton.module.scss'

const ScrollButton = ({ scrollFunc }) => { 
    return (
        <button className={style.close_btn} onClick={scrollFunc}>
            <span>9</span>
            <img src={arrowIcon} alt="icon" />
        </button>
    );
}

export default ScrollButton;
