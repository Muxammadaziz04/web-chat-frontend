import { useState, useRef } from 'react';
import Emoji from '../../Emoji';

import smileIcon from '../../../Assets/smile.svg'
import sendIcon from '../../../Assets/send.svg'

import style from './Footer.module.scss'

const MessagesFooter = () => {
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState('')
    const inputRef = useRef()

    const pickEmoji = (emoji) => {
        inputRef.current.focus()
        
        const cursor = inputRef.current.selectionStart;
        const text = message.slice(0, cursor) + emoji + message.slice(cursor);

        setMessage(text)
        setTimeout(() => {
            inputRef.current.setSelectionRange(cursor+2, cursor+2)
        }, 0)
    }

    const handleClickIcon = () => {
        setVisible(state => !state)
    }

    return (
        <div className={style.footer}>
            {visible ? <Emoji pickEmoji={pickEmoji} /> : <></>}

            <button className={style.footer__btn} data-type="emoji" onClick={handleClickIcon}>
                <img src={smileIcon} alt="icon" />
            </button>

            <input
                className={style.footer__input}
                type="text"
                placeholder='Write a message'
                ref={inputRef}
                value={message}
                onChange={e => setMessage(e.target.value)}
            />

            <button className={style.footer__btn}>
                <img src={sendIcon} alt="icon" />
            </button>
        </div>
    );
}

export default MessagesFooter;
