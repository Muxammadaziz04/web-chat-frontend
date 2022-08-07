import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import chatActions from '../../../redux/actions/ChatAction.js'

import style from './Item.module.scss'

const ChatItem = ({ dialog }) => {
    const dispatch = useDispatch()

    const user = dialog.companion[0]

    const handleClick = (e) => {
        const items = document.querySelectorAll('[data-item]')

        items.forEach((item) => {
            item.classList.remove(`${style.profile__active}`)
        })

        e.target.closest('li').classList.add(`${style.profile__active}`)
        dispatch(chatActions.setChat(dialog?.dialog_id))
    }

    return (
        <Link to={`/dialog/${dialog?.dialog_id}`}>
            <li className={style.profile} data-item onClick={handleClick}>
                <div className={`${style.profile__img} ${dialog?.companion[0].action === 'online' ? style.online : ''}`}>
                    <span>
                        <img
                            src={dialog?.user_avatar}
                            alt='profile img'
                        />
                    </span>
                </div>
                <span>
                    <span className={style.profile__info}>
                        <p className={style.profile__name}>{dialog?.companion[0].full_name}</p>
                        <time className={style.profile__time}>{dialog?.companion[0].time}</time>
                    </span>
                    <span className={style.profile__info}>
                        <p className={style.profile__message}>{user?.message}</p>
                        <span className={style.profile__notificate}>{user?.notificate}</span>
                    </span>
                </span>
            </li>
        </Link>
    );
}

export default ChatItem;
