import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import arrowIcon from '../../../Assets/arrow.svg'

import style from './ScrollButton.module.scss'

const ScrollButton = ({ containerRef }) => {
    const { companion_id } = useParams()
    const [notificate, setNotificate] = useState(0) 
    const {dialogs} = useSelector(state => state.dialogsReducer)

    const scrollFunc = () => {
        containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        setNotificate(dialogs?.find(dialog => dialog.dialog_members?.includes(companion_id))?.notificate)
    }, [dialogs, companion_id])

    return (
        <button className={`${style.btn}`} onClick={scrollFunc}>
            {notificate > 0 && <span>{notificate}</span>}
            <img src={arrowIcon} alt="icon" />
        </button>
    );
}

export default ScrollButton;