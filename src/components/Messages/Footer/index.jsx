import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Emoji from '../../Emoji';

import smileIcon from '../../../Assets/smile.svg'
import sendIcon from '../../../Assets/send.svg'
import { host, token } from '../../../constants';

import style from './Footer.module.scss'

const MessagesFooter = () => {
    const { dialog_id } = useParams()
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState('')
    const inputRef = useRef()

    const pickEmoji = (emoji) => {
        inputRef.current.focus()        
        const cursor = inputRef.current.selectionStart;
        const text = message.slice(0, cursor) + emoji.native + message.slice(cursor);
        setMessage(text)
        setTimeout(() => {
            inputRef.current.setSelectionRange(cursor + 2, cursor + 2)
        }, 0)
    }

    const handleClickIcon = () => {
        setVisible(state => !state)
    }

    const sendMessage = async() => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', token },
            body: JSON.stringify({ message_body: inputRef.current.value.trim() })
        }

        let res = await fetch(`${host}/message/${dialog_id}`, options)
        res = await res.json()

        if(res.status === 201){
            inputRef.current.value = ''
        } else {
            alert('Somethink went wrong. Please try again')
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

export default MessagesFooter;
