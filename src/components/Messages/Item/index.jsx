// import { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
import getTimes from '../../../Utils';

import MessagesStatus from '../Status';

import style from './Item.module.scss'

const MessageItem = ({message}) => {
    // const [viewed, setViewed] = useState(message.viewed)
    // const scrollPos = useSelector(state => state.scrollPosReducer.pos)
    // const messageRef = useRef()

    // useEffect(() => {
        // const heightFromTop = messageRef.current.offsetTop - container.current.scrollTop

        // if(heightFromTop >= 0 && heightFromTop < container.current.clientHeight && !viewed){
        //     console.log(heightFromTop + ` ${message.message}`);
        //     setViewed(true)
        // }
    // });
    const {time} = getTimes(message.created_at)

    return (
        <>
            <p className={`${message.message_from === '0912eee5-1b21-4b4e-82c4-af4439be2d03' ? style.message__item__from : style.message__item}`} id={message.message_id}>
                {
                    message.message_body
                }
            </p>
            <MessagesStatus viewed={message.viewed} time={time} message_from={message.message_from}  />
        </>
    );
}

export default MessageItem;
