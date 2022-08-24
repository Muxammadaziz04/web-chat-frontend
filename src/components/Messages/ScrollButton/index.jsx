import React from 'react';
import { useSelector } from 'react-redux';

import arrowIcon from '../../../Assets/arrow.svg'

import style from './ScrollButton.module.scss'

const ScrollButton = ({ scrollFunc }) => {
    // const btnState = useSelector(state => state.ButtonToScrollReducer)
 
    return (
        <button className={style.close_btn} onClick={scrollFunc}>
            <span>9</span>
            <img src={arrowIcon} alt="icon" />
        </button>
    );
}

export default ScrollButton;
