// import { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';

import getTimes from '../../../Utils';
import MessagesStatus from '../Status';
import {user_id} from '../../../constants'

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
    const msg = message.message_body
    
    return (
        <>
            <p 
                className={`${message.message_from === user_id ? style.message__item__from : style.message__item}`} 
                id={message.message_id}
                dangerouslySetInnerHTML={{__html: msg}}
            >
            </p>
            <MessagesStatus viewed={message.viewed} time={time} message_from={message.message_from}  />
        </>
    );
}

export default MessageItem;
