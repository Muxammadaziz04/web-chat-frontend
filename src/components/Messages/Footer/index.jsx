import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import smileIcon from '../../../Assets/smile.svg'
import sendIcon from '../../../Assets/send.svg'
import { host } from '../../../constants';
import { socket } from '../../../socket';
import { newMessage } from '../../../redux/actions/dialogsAction'
import Emoji from '../../Emoji';

import style from './Footer.module.scss'

const Footer = ({ setMessages, container }) => {
    const inputRef = useRef()
    const dispatch = useDispatch()
    const { companion_id } = useParams()
    const [message, setMessage] = useState('')
    const [visible, setVisible] = useState(false)
    const { token } = useSelector(state => state.userReducer)

    const pickEmoji = useCallback((emoji) => {
        inputRef.current.focus()
        const cursor = inputRef.current.selectionStart;
        const text = message.slice(0, cursor) + emoji.native + message.slice(cursor);
        setMessage(text)
        setTimeout(() => {
            inputRef.current.setSelectionRange(cursor + 2, cursor + 2)
        }, 0)
    }, [message])

    const sendMessage = async () => {
        const msg = inputRef.current.value.trim()
        if (msg) {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token },
                body: JSON.stringify({ message_body: msg })
            }
            let res = await fetch(`${host}/message/${companion_id}`, options)
            res = await res.json()

            if (res.status === 201) {
                setMessage('')
                setMessages(state => [...state, res.data.msg])
                socket.emit('SEND_MESSAGE', { companion_id, data: res.data.msg, dialog_id: res.data.msg.dialog_id, user: res.data.user })
                dispatch(newMessage({ companion_id, data: res.data.msg, dialog_id: res.data.msg.dialog_id, user: res.data.user }))
                setTimeout(() => {
                    container.current.scrollTo({top: container?.current.scrollHeight + container?.current.clientHeight, behavior: "smooth"})
                }, 0) 
            } else {
                alert('Somethink went wrong. Please try again')
            }
        }
    }

    return (
        <div className={style.footer}>
            {visible ? <Emoji pickEmoji={pickEmoji} /> : <></>}

            <button className={style.footer__btn} data-type="emoji" onClick={() => setVisible(state => !state)}>
                <img src={smileIcon} alt="icon" />
            </button>

            <input
                className={style.footer__input}
                placeholder='Write a message'
                ref={inputRef}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyUp={e => e.keyCode === 13 && sendMessage()}
                rows={4}
            />

            <button className={style.footer__btn} onClick={sendMessage}>
                <img src={sendIcon} alt="icon" />
            </button>
        </div>
    );
}

export default React.memo(Footer);
