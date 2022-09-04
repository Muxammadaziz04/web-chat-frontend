import React from 'react';
import LetteredAvatar from 'react-lettered-avatar';

import style from './Contacts.module.scss'

const Contacts = ({ user }) => {
    return (
        <div className={style.contacts}>
            <div className={style.contacts__img}>
                {
                    user?.user_avatar ? <img src={user?.user_avatar} alt="profile img" /> 
                    : <LetteredAvatar name={user?.fullname || ''} size={124} />
                }
            </div>
            <p className={style.contacts__name}>{user?.fullname}</p>
            <p className={style.contacts__contact}>{user?.email}</p>
        </div>
    );
}

export default React.memo(Contacts);
