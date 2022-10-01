import { useSelector } from 'react-redux'
import unViewedIcon from '../../../Assets/check-mark-1.svg'
import viewedIcon from '../../../Assets/check-mark-2.svg'

import style from './Status.module.scss'

const MessagesStatus = ({message_from, viewed, time}) => {
    const { user_id } = useSelector(state => state.userReducer)

    return (
        <span className={`${message_from === user_id ? style.messages__status__from : style.messages__status}`}>
            {
                message_from === user_id ? <img src={viewed ? viewedIcon : unViewedIcon} alt="icon" /> : <></>
            }
            <time>
                {time}
            </time>
        </span>
    );
}

export default MessagesStatus;