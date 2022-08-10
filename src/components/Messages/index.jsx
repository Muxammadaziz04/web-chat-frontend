import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { useParams } from "react-router-dom";

import MessageItem from "./Item";
import Header from "./Header";
import Footer from "./Footer";
import MessagesDate from "./Date";
import ScrollButton from './ScrollButton'
import btnActions from '../../redux/actions/ButtonToScrollAction.js';
import setScrollPos from "../../redux/actions/ScrollPosAction";
import getTimes from "../../Utils";
import { host, token } from '../../constants'

import styles from './Messages.module.scss';

const Messages = () => {
    const [messages, setMessages] = useState([])
    const { openBtn, closeBtn } = btnActions
    const dispatch = useDispatch()
    const container = useRef()
    const { dialog_id } = useParams()
    const cache = useRef(new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 1,
    }))

    let prevScrollpos = ''
    let currentFullDate = ''

    const firstNewMessageId = messages?.find(msg => msg.viewed === false)?.message_id

    const handleScroll = () => {
        const currentScrollPos = container.current.scrollTop
        const currentScrollPosWithBottom = container?.current?.scrollTop + container?.current?.clientHeight
        const scrollHeight = container?.current?.scrollHeight

        if (currentScrollPosWithBottom === scrollHeight || prevScrollpos > currentScrollPos) {
            dispatch(closeBtn())
        } else {
            dispatch(openBtn())
        }

        prevScrollpos = currentScrollPos;
    }

    const scrollToBottom = useCallback(() => {
        container.current.scrollTo({
            top: container.current.scrollHeight,
            behavior: 'smooth'
        })
    }, [])

    useLayoutEffect(() => {
        prevScrollpos = container?.current?.scrollTop;
        ; (() => {
            fetch(`${host}/messages/${dialog_id}`, { headers: { token } })
                .then(response => response.json())
                .then(response => setMessages(response.data))
        })()

        const unreadedId = messages.find(message => message.viewed === false)?.message_id
        const scrollSizeToUnreadedMessage = document.getElementById(unreadedId)?.offsetTop
        const scrollHeight = scrollSizeToUnreadedMessage - 40 || container.current.scrollHeight
        
        // con.childNodes[0].scrollTo({
        //     top: 500,
        //     behavior: "auto"
        // })
    }, [])

    useEffect(() => {
        let con = document.getElementsByClassName('ReactVirtualized__Grid__innerScrollContainer')
        console.log([...con][0]);
    }, [messages])

    return(
        <div className={styles.messages}>
            <Header />

            <div className={styles.messages__btnwrapper}>
                <div
                    className={styles.messages__container}
                    ref={container}
                    onScroll={(e) => {
                        dispatch(setScrollPos(e.target.scrollTop))
                        handleScroll()
                    }}
                >
                    {
                        // messages.map(msg => {
                        //     const { fullDate } = getTimes(msg.date)

                        //     const Item = (
                        //         <React.Fragment key={msg.id}>
                        //             {currentFullDate != fullDate ? <MessagesDate text={fullDate} /> : <></>}
                        //             {firstNewMessageId === msg.message_id ? <MessagesDate text={'new Message'} /> : <></>}
                        //             <MessageItem message={msg} container={container} />
                        //         </React.Fragment>
                        //     )
                        //     currentFullDate = currentFullDate !== fullDate ? fullDate : currentFullDate

                        //     return Item
                        // })

                        <AutoSizer>
                            {
                                ({ width, height }) => (
                                    <List
                                        className={styles.messages__wrapper}
                                        id="54"
                                        width={width}
                                        height={height}
                                        rowHeight={cache.current.rowHeight}
                                        deferredMeasurementCache={cache.current}
                                        rowCount={messages?.length || 0}
                                        rowRenderer={({ key, index, style, parent }) => {
                                            const msg = messages[index];
                                            const { fullDate } = getTimes(msg.created_at)

                                            const Item = (
                                                <span key={msg.message_id} className={'m'} style={style}>
                                                    {currentFullDate !== fullDate ? <MessagesDate text={fullDate} /> : <></>}
                                                    {firstNewMessageId === msg.message_id ? <MessagesDate text={'new Message'} /> : <></>}
                                                    <MessageItem message={msg} container={container} />
                                                </span>
                                            )
                                            currentFullDate = currentFullDate !== fullDate ? fullDate : currentFullDate


                                            return (
                                                <CellMeasurer
                                                    id="78"
                                                    key={key}
                                                    cache={cache.current}
                                                    parent={parent}
                                                    columnIndex={0}
                                                    rowIndex={index}
                                                >
                                                    {Item}
                                                </CellMeasurer>
                                            );
                                        }}
                                    />
                                )
                            }
                        </AutoSizer>
                    }
                </div>

                <ScrollButton scrollFunc={scrollToBottom} />
            </div>

            <Footer />
        </div>
    );
}

export default Messages;