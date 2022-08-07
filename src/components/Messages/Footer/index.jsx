import smileIcon from '../../../Assets/smile.svg'
import sendIcon from '../../../Assets/send.svg'

import style from './Footer.module.scss'

const MessagesFooter = () => {
    return (
        <div className={style.footer}>
            <button className={style.footer__btn}>
                <img src={smileIcon} alt="icon" />
            </button>
            <input className={style.footer__input} type="text" placeholder='Write a message' />
            <button className={style.footer__btn}>
                <img src={sendIcon} alt="icon" />
            </button>
        </div>
    );
}

export default MessagesFooter;
