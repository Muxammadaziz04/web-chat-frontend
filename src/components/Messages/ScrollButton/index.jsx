import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import arrowIcon from '../../../Assets/arrow.svg'

import style from './ScrollButton.module.scss'

const ScrollButton = ({ containerRef, visible }) => {
    const { companion_id } = useParams()
    const { notificate } = useSelector(state => {
        return state.dialogsReducer.data?.find(dialog => dialog.dialog_members.includes(companion_id)) || {}
    })

    const scrollFunc = () => {
        containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: 'smooth'
        })
    }

    return (
        <button className={`${style.btn}`} onClick={scrollFunc}>
            {notificate > 0 && <span>{notificate}</span>}
            <img src={arrowIcon} alt="icon" />
        </button>
    );
}

export default ScrollButton;