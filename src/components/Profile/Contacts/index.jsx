import LetteredAvatar from 'react-lettered-avatar';

import style from './Contacts.module.scss'

const Contacts = ({ companion }) => {
    return (
        <div className={style.contacts}>
            <div className={style.contacts__img}>
                {
                    companion.user_avatar ? <img src={companion.user_avatar} alt="profile img" /> 
                    : <LetteredAvatar name={companion.fullname} size={124} />
                }
            </div>
            <p className={style.contacts__name}>{companion.fullname}</p>
            <p className={style.contacts__contact}>{companion.email}</p>
        </div>
    );
}

export default Contacts;
