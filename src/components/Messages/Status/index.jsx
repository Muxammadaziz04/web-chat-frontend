import unViewedIcon from '../../../Assets/check-mark-1.svg'
import viewedIcon from '../../../Assets/check-mark-2.svg'

import style from './Status.module.scss'

const MessagesStatus = ({user_id, viewed, date}) => {
    date = new Date(date)

    const hours = date.getHours()
    const minutes = date.getMinutes()

    const time = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}`: minutes} `

    return (
        <span className={`${user_id == 1 ? style.messages__status__from : style.messages__status}`}>
            {
                user_id == 1 ? <img src={viewed ? viewedIcon : unViewedIcon} alt="icon" /> : <></>
            }
            <time>
                {time}
            </time>
        </span>
    );
}

export default MessagesStatus;