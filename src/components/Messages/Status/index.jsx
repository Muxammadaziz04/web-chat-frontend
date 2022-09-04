import unViewedIcon from '../../../Assets/check-mark-1.svg'
import viewedIcon from '../../../Assets/check-mark-2.svg'
import { user_id } from '../../../constants'

import style from './Status.module.scss'

const MessagesStatus = ({message_from, viewed, time}) => {

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