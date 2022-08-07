import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import MessagesStatus from '../Status';

import style from './Item.module.scss'

const MessageItem = ({message, container}) => {
    const [viewed, setViewed] = useState(message.viewed)
    const scrollPos = useSelector(state => state.scrollPosReducer.pos)
    const messageRef = useRef()

    useEffect(() => {
        const heightFromTop = messageRef.current.offsetTop - container.current.scrollTop

        if(heightFromTop >= 0 && heightFromTop < container.current.clientHeight && !viewed){
            console.log(heightFromTop + ` ${message.message}`);
            setViewed(true)
        }
    });

    return (
        <>
            <p className={`${message.user_id == 1 ? style.message__item__from : style.message__item}`} ref={messageRef} id={message.message_id}>
                {
                    message.message
                }
            </p>
            <MessagesStatus viewed={message.viewed} date={message.time} user_id={message.user_id}  />
        </>
    );
}

export default MessageItem;
