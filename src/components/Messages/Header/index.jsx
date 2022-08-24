import { useDispatch, useSelector } from 'react-redux';
import LetteredAvatar from 'react-lettered-avatar';

import actions from '../../../redux/actions/contactInfoAction'
import dropIcon from '../../../Assets/3dot.svg'
import getTimes from '../../../Utils/index.js';

import style from './Header.module.scss'

const MessagesHeader = () => {
    const dispatch = useDispatch()
    const { openContactInfo, closeContactInfo } = actions
    const companion = useSelector(state => state.companionReducer)
    const isOpen = useSelector(state => state.contactInfoReducer.isOpen)

    const toogleContactInfo = () => {
        dispatch(isOpen ? closeContactInfo() : openContactInfo())
    }

    const currentFullDate = getTimes(new Date).fullDate
    const { time, fullDate } = getTimes(companion.last_seem)

    return (
        <div className={style.header}>
            <span className={style.header__block}>
                <div className={style.header__img}>
                    {
                        companion.user_avatar ? <img src={companion.user_avatar} alt="profile img" />
                            : <LetteredAvatar name={companion.fullname} size={40} />
                    }
                </div>
                <span>
                    <p className={style.header__name}>{companion.fullname}</p>
                    <p className={style.header__status}>
                        {
                            companion.user_action !== 'offline' ? companion.user_action
                                : `last seen ${currentFullDate !== fullDate ? fullDate : ''} ${time}`
                        }
                    </p>
                </span>
            </span>
            <span className={style.header__block}>
                <button className={style.header__btn} onClick={toogleContactInfo} >
                    <img src={dropIcon} alt="3 dot icon" />
                </button>
            </span>
        </div>
    );
}

export default MessagesHeader;
