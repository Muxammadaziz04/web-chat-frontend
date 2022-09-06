import { useRef, useEffect, useCallback, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import getTimes from '../../../Utils';
import MessagesStatus from '../Status';
import { host, user_id, token } from '../../../constants'
import { socket } from '../../../socket'
import { msgViewed } from '../../../redux/actions/dialogsAction';

import style from './Item.module.scss'

const Item = ({ message }) => {
    const messageRef = useRef()
    const dispatch = useDispatch()
    const { companion_id } = useParams()
    const [viewed, setViewed] = useState(message?.viewed)

    const { time } = getTimes(message.created_at)
    const msg = message.message_body

    const changeMsgStatus = async (inView) => {
        if (inView && !viewed && user_id !== message.message_from) {
            socket.emit('MESSAGE_VIEWED', { message_id: message.message_id, companion_id })
            dispatch(msgViewed({ dialog_id: message.dialog_id }))
            await fetch(`${host}/viewed/${message.message_id}`, { method: "PUT", headers: { token } })
        }
    }

    const func = useCallback((data) => {
        if (data.message_id === message.message_id) {
            setViewed(true)
        }
    }, [message])

    useEffect(() => {
        socket.on('CHANGE_MSG_STATUS', func)
        return () => socket.off('MESSAGE_VIEWED', func)
    }, [func])

    useEffect(() => {
        setViewed(message.viewed)
    }, [message])

    return (
        <>
            <InView as='p' onChange={changeMsgStatus} triggerOnce={true}
                className={`${message.message_from === user_id ? style.message__item__from : style.message__item}`}
                ref={messageRef}
                dangerouslySetInnerHTML={{ __html: msg }}
            >
            </InView>
            <MessagesStatus viewed={viewed} time={time} message_from={message.message_from} />
        </>
    );
}

export default Item;
