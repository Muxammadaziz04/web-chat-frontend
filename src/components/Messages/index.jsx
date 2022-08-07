import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MessageItem from "./Item";
import Header from "./Header";
import Footer from "./Footer";
import MessagesDate from "./Date";
import ScrollButton from './ScrollButton'
import btnActions from '../../redux/actions/ButtonToScrollAction.js';
import setScrollPos from "../../redux/actions/ScrollPosAction";

import style from './Messages.module.scss';

const Messages = () => {
    const [messages] = useState([])
    const { openBtn, closeBtn } = btnActions
    const dispatch = useDispatch()
    const { chat_id } = useSelector(state => state.chatReducer)
    const container = useRef()

    let prevScrollpos = ''
    let currentFullDate = ''

    const firstNewMessageId = messages?.find(msg => msg.viewed === false)?.message_id

    const getMonthInString = useCallback((num) => {
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return month[num]
    }, [])


    const getMsgDate = useCallback((date) => {
        const currentYear = new Date().getFullYear()
        const messageDate = new Date(date)
        const messageYear = messageDate.getFullYear()
        const messageMonth = getMonthInString(messageDate.getMonth())
        const messageDay = messageDate.getDate()
        return `${messageDay} ${messageMonth} ${messageYear == currentYear ? '' : messageYear}`
    }, [])


    const handleScroll = () => {
        const currentScrollPos = container.current.scrollTop
        const currentScrollPosWithBottom = container?.current?.scrollTop + container?.current?.clientHeight
        const scrollHeight = container?.current?.scrollHeight

        if (currentScrollPosWithBottom == scrollHeight || prevScrollpos > currentScrollPos) {
            dispatch(closeBtn())
        } else {
            dispatch(openBtn())
        }

        prevScrollpos = currentScrollPos;
    }


    const scrollToBottom = () => {
        container.current.scrollTo({
            top: container.current.scrollHeight,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        prevScrollpos = container?.current.scrollTop;

        const unreadedId = messages.find(message => message.viewed == false)?.message_id
        const scrollSizeToUnreadedMessage = document.getElementById(unreadedId)?.offsetTop
        const scrollHeight = scrollSizeToUnreadedMessage - 40 || container.current.scrollHeight

        container.current.scrollTo({
            top: scrollHeight,
            behavior: "auto"
        })
    }, [])

    return (
        <div className={style.messages}>
            <Header />

            <div className={style.messages__btnwrapper}>
                <div
                    className={style.messages__container}
                    ref={container}
                    onScroll={(e) => {
                        dispatch(setScrollPos(e.target.scrollTop))
                        handleScroll()
                    }}
                >
                    {
                        messages.map(msg => {
                            const msgDate = getMsgDate(msg.time)

                            const Item = (
                                <React.Fragment key={msg.message_id}>
                                    {currentFullDate != msgDate ? <MessagesDate text={msgDate} /> : <></>}
                                    {firstNewMessageId === msg.message_id ? <MessagesDate text={'new Message'} /> : <></>}
                                    <MessageItem message={msg} container={container} />
                                </React.Fragment>
                            )
                            // currentFullDate != msgDate ? currentFullDate = msgDate : null

                            return Item
                        })
                    }
                </div>
                <ScrollButton scrollFunc={scrollToBottom} />
            </div>

            <Footer />
        </div>
    );
}

export default Messages;