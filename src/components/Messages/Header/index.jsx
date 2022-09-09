import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LetteredAvatar from 'react-lettered-avatar';

import actions from '../../../redux/actions/contactInfoAction'
import dropIcon from '../../../Assets/3dot.svg'
import getTimes from '../../../Utils/index.js';
import { socket } from '../../../socket';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

import style from './Header.module.scss'

const Header = ({ user }) => {
    const dispatch = useDispatch()
    const [isOnline, setIsOnline] = useState(false)
    const { openContactInfo, closeContactInfo } = actions
    const isOpen = useSelector(state => state.contactInfoReducer.isOpen)
    
    const currentFullDate = getTimes(new Date()).fullDate
    const { time, fullDate } = getTimes(user?.last_seem)

    const toogleContactInfo = () => {
        dispatch(isOpen ? closeContactInfo() : openContactInfo())
    }
    
    const setStatus = useCallback(data => {
        if (data.user_id === user.user_id) {
            user.user_action = data.status
            user.last_seem = data.status === 'online' ? user.last_seem : Date.now()
            setIsOnline(data.status === 'online' ? true : false)
        }
    }, [user])

    useEffect(() => {
        socket.on('NEW_USER_ONLINE', setStatus)
        socket.on('USER_EXIT', setStatus)
        return () => {
            socket.off('NEW_USER_ONLINE', setStatus)
            socket.off('USER_EXIT', setStatus)
        }
    }, [setStatus])

    useEffect(() => {
        setIsOnline(user?.user_action === 'online'  ? true : false)
    }, [user])

    return (
        <div className={style.header}>
            <span className={style.header__block}>
                <div className={style.header__img}>
                    {
                        user?.user_avatar ? <img src={user?.user_avatar} alt="profile img" />
                            : <LetteredAvatar name={user?.fullname || ''} size={43} />
                    }
                </div>
                <span>
                    <p className={style.header__name}>{user?.fullname || ''}</p>
                    <p className={`${style.header__status} ${isOnline ? style.online : ''}`}>
                        {
                            isOnline ? user?.user_action
                                : `last seen ${currentFullDate !== fullDate ? fullDate : ''} ${time}`
                        }
                    </p>
                </span>
            </span>
            <button className={style.header__btn} onClick={toogleContactInfo} >
                <img src={dropIcon} alt="3 dot icon" />
            </button>
        </div>
    );
}

export default Header;