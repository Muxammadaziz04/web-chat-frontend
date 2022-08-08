import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LetteredAvatar from 'react-lettered-avatar';

import chatActions from '../../../redux/actions/ChatAction.js'

import style from './Item.module.scss'

const ChatItem = ({ chat }) => {
    const dispatch = useDispatch()

    const user = chat.companion[0]
    const message = chat.last_message[0]
    let time = new Date(message?.created_at)
    const minute = time.getMinutes()
    const hours = time.getHours()
    time = `${hours < 10 ? `0${hours}` : hours}:${minute < 10 ? `0${minute}` : minute}`

    const handleClick = (e) => {
        const items = document.querySelectorAll('[data-item]')

        items.forEach((item) => {
            item.classList.remove(`${style.profile__active}`)
        })

        e.target.closest('li').classList.add(`${style.profile__active}`)
        dispatch(chatActions.setChat(chat?.dialog_id))
    }

    return (
        <Link to={`/dialog/${chat?.dialog_id}`}>
            <li className={style.profile} data-item onClick={handleClick}>
                <div className={`${style.profile__img} ${user.user_action === 'online' ? style.online : ''}`}>
                    <span>
                        {
                            user.user_avatar ? <img src={user?.user_avatar} alt='profile img' /> 
                            : <LetteredAvatar name={user.first_name} />
                        }
                    </span>
                </div>
                <span>
                    <span className={style.profile__info}>
                        <p className={style.profile__name}>{user.first_name}</p>
                        <time className={style.profile__time}>{time || ''}</time>
                    </span>
                    <span className={style.profile__info}>
                        {
                            message?.message_body && <p className={style.profile__message}>{message?.message_body}</p>
                        }
                        {
                            user?.notificate && <span className={style.profile__notificate}>{user?.notificate}</span>
                        }
                    </span>
                </span>
            </li>
        </Link>
    );
}

export default ChatItem;
