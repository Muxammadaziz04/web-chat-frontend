import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useParams } from "react-router-dom";

import MessageItem from "./Item";
import Header from "./Header";
import Footer from "./Footer";
import MessagesDate from "./Date";
// import ScrollButton from './ScrollButton'
// import btnActions from '../../redux/actions/ButtonToScrollAction.js';
// import setScrollPos from "../../redux/actions/ScrollPosAction";
import { host, token } from '../../constants'

import styles from './Messages.module.scss';
import getTimes from "../../Utils";

const Messages = () => {
    const [messages, setMessages] = useState([])
    const listRef = useRef({});
    const rowHeights = useRef({});
    const { dialog_id } = useParams()

    const firstNewMessageId = messages.find(msg => !msg.viewed)?.message_id

    function getRowHeight(index) {
        return rowHeights.current[index];
    }

    function Row({ index, style }) {
        const rowRef = useRef({});
        const msg = messages[index]

        useEffect(() => {
            if (rowRef.current) {
                setRowHeight(index, rowRef.current.clientHeight);
            }
        }, [rowRef]);

        return (
            <span className={'m'} ref={rowRef} style={style}>
                {firstNewMessageId === msg.message_id ? <MessagesDate text={'new Message'} /> : <></>}
                <MessageItem message={msg} />
            </span>
        );
    }

    function setRowHeight(index, size) {
        listRef.current.resetAfterIndex(0);
        rowHeights.current = { ...rowHeights.current, [index]: size };
    }

    useLayoutEffect(() => {
        fetch(`${host}/messages/${dialog_id}`, { headers: { token } })
            .then(response => response.json())
            .then(response => setMessages(response.data))
    }, [])

    useEffect(() => {
        const unreadedMsgId = messages.findIndex(msg => !msg.viewed)
      if(messages.length){
        
      }
    }, [messages])


    return (
        <div className={styles.messages}>
            <Header />
            <div className={styles.messages__btnwrapper}>
                <div className={styles.messages__container}>
                    {
                        <AutoSizer>
                            {({ height, width }) => (
                                <List
                                    className={styles.messages__wrapper}
                                    height={height}
                                    itemCount={messages.length || 0}
                                    itemSize={getRowHeight}
                                    ref={listRef}
                                    width={width}
                                >
                                    {Row}
                                </List>
                            )}
                        </AutoSizer>
                    }
                </div>
                {/* <ScrollButton scrollFunc={scrollToBottom} /> */}
            </div>

            <Footer />
        </div>
    );
}

export default Messages;