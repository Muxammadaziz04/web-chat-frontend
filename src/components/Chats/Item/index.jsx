import React from 'react';
import { Link } from 'react-router-dom'
import LetteredAvatar from 'react-lettered-avatar';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import getTimes from '../../../Utils';

import style from './Item.module.scss'

const ChatItem = ({ chat, finded_user = false }) => {
    const { user, message, time, notificate } = {
        user: chat?.companion[0],
        message:  chat?.last_message && chat?.last_message[0]?.message_body,
        time: chat?.last_message && getTimes(chat?.last_message[0]?.created_at).time,
        notificate: chat.notificate
    }

    const handleClick = (e) => {
        const items = document.querySelectorAll('[data-item]')
        items.forEach((item) => item.classList.remove(`${style.profile__active}`))
        e.target.closest('li').classList.add(`${style.profile__active}`)
    }

    return (
        <Link to={`/dialog/${user?.user_id}`}>
            <li className={style.profile} data-item onClick={handleClick}>
                <div className={`${style.profile__img} ${user?.user_action === 'online' ? style.online : ''}`}>
                    <span>
                        {
                            user?.user_avatar ?
                                <LazyLoadImage
                                    src={user?.user_avatar}
                                    width="100%"
                                    height="100%"
                                    alt='profile img'
                                    effect="blur"
                                    placeholderSrc='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'
                                    wrapperClassName={style.avatar}
                                />
                                : <LetteredAvatar name={user?.fullname} />
                        }
                    </span>
                </div>
                <span>
                    <span className={style.profile__info}>
                        <p className={style.profile__name}>{user?.fullname || ''}</p>
                        <time className={style.profile__time}>{!finded_user && (time || '')}</time>
                    </span>
                    <span className={style.profile__info}>
                        {
                            message && <p className={style.profile__message}>{finded_user ? `@${user?.username}` : message}</p>
                        }
                        {
                            notificate > 0 && !finded_user && <span className={style.profile__notificate}>{notificate}</span>
                        }
                    </span>
                </span>
            </li>
        </Link>
    );
}

export default ChatItem;
