import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LetteredAvatar from 'react-lettered-avatar';
import { useNavigate } from 'react-router-dom';

import newChatIcon from '../../../Assets/new-chat.svg'
import dropIcon from '../../../Assets/3dot.svg'

import style from './Header.module.scss'
import AddChat from '../AddChat';
import Popup from '../Popup';

const ChatsHeader = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const user = useSelector(state => state.userReducer)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenPopup, setIsOpenPopup] = useState(false)

    const logOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem('user_id')
        dispatch({type: "SET_USER", payload: {}})
        navigate('/login')
    }

    return (
        <div className={style.header}>
            <div className={style.header__img}>
                {
                    user.user_avatar ? <img src={user.user_avatar} alt='user avatar' /> : <LetteredAvatar size={40} name={user.fullname} />
                }
            </div>

            <button className={style.header__icons} onClick={() => setIsOpenModal(state => !state)}>
                <img src={newChatIcon} alt="icon" />
            </button>

            <AddChat isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
            {isOpenPopup ? <Popup visible={isOpenPopup} setVisible={setIsOpenPopup} /> : <></>}

            <span className={style.header__dropdown__wrapper}>
                <button className={style.header__icons} onClick={() => setIsOpen(!isOpen)}>
                    <img src={dropIcon} alt="icon" />
                </button>
                <div className={style.header__dropdown + `${isOpen ? '' : ' close'}`}>
                    <button onClick={() => {setIsOpenPopup(state => !state); setIsOpen(false)}}>Settings</button>
                    <button onClick={logOut}>Log out</button>
                </div>
            </span>
        </div>
    );
}

export default React.memo(ChatsHeader);
