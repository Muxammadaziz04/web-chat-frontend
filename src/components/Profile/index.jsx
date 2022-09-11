import React from 'react';
import { useSelector } from 'react-redux';

import Contacts from './Contacts';
import Header from './Header';
import Info from './Info';

import style from './Profile.module.scss'

const Profile = ({ user }) => {
    const isOpen = useSelector(state => state.contactInfoReducer.isOpen)

    if (!isOpen) return <></>

    return (
        <aside className={style.profile}>
            <Header />
            <Contacts user={user} />
            <Info user={user} />
        </aside>
    );
}

export default React.memo(Profile);
