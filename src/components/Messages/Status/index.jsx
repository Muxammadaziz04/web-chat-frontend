import unViewedIcon from '../../../Assets/check-mark-1.svg'
import viewedIcon from '../../../Assets/check-mark-2.svg'

import style from './Status.module.scss'

const MessagesStatus = ({message_from, viewed, time}) => {

    return (
        <span className={`${message_from === '0912eee5-1b21-4b4e-82c4-af4439be2d03' ? style.messages__status__from : style.messages__status}`}>
            {
                message_from === '0912eee5-1b21-4b4e-82c4-af4439be2d03' ? <img src={viewed ? viewedIcon : unViewedIcon} alt="icon" /> : <></>
            }
            <time>
                {time}
            </time>
        </span>
    );
}

export default MessagesStatus;