import React, { useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';

import smileIcon from '../../../Assets/smile.svg'
import sendIcon from '../../../Assets/send.svg'
import { host, token } from '../../../constants';
import Emoji from '../../Emoji';

import style from './Footer.module.scss'
import { socket } from '../../../socket';

const MessagesFooter = ({setMessages}) => {
    const inputRef = useRef()
    const [message, setMessage] = useState('')
    const [visible, setVisible] = useState(false)
    const { companion_email, dialog_id } = useSelector(state => state.companionReducer)

    const pickEmoji = useCallback((emoji) => {
        inputRef.current.focus()
        const cursor = inputRef.current.selectionStart;
        const text = message.slice(0, cursor) + emoji.native + message.slice(cursor);
        setMessage(text)
        setTimeout(() => {
            inputRef.current.setSelectionRange(cursor + 2, cursor + 2)
        }, 0)
    }, [message])

    const handleClickIcon = () => {
        setVisible(state => !state)
    }

    const sendMessage = async () => {
        const msg = inputRef.current.value.trim()
        if (msg) {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token },
                body: JSON.stringify({ message_body: msg })
            }

            let res = await fetch(`${host}/message/${dialog_id}`, options)
            res = await res.json()

            if (res.status === 201) {
                inputRef.current.value = ''
                setMessages(state => [...state, res.data[0]])
                socket.emit('SEND_MESSAGE', { companion_email, dialog_id, data: res.data[0] })
            } else {
                console.log(res);
                alert('Somethink went wrong. Please try again')
            }
        }
    }

    return (
        <div className={style.footer}>
            {visible ? <Emoji pickEmoji={pickEmoji} /> : <></>}

            <button className={style.footer__btn} data-type="emoji" onClick={handleClickIcon}>
                <img src={smileIcon} alt="icon" />
            </button>

            <textarea
                className={style.footer__input}
                placeholder='Write a message'
                ref={inputRef}
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
            />

            <button className={style.footer__btn} onClick={sendMessage}>
                <img src={sendIcon} alt="icon" />
            </button>
        </div>
    );
}

export default React.memo(MessagesFooter);
