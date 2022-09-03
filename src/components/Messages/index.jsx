import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MessageItem from "./Item";
import Header from "./Header";
import Footer from "./Footer";
import MessageDate from "./Date";
import ScrollButton from './ScrollButton'
import { host, token } from '../../constants'

import styles from './Messages.module.scss';
import getTimes from "../../Utils";

const Messages = () => {
    const [messages, setMessages] = useState([])
    const { dialog_id } = useParams()

    let { fullDate: currentFullDate } = getTimes(new Date())
    const firstNewMessageId = messages?.find(msg => !msg.viewed)?.message_id || 0

    useEffect(() => {
        fetch(`${host}/messages/${dialog_id}`, { headers: { token } })
            .then(response => response.json())
            .then(response => setMessages(response.data))
    }, [dialog_id])

    return (
        <div className={styles.messages}>
            <Header />
            <div className={styles.messages__btnwrapper}>
                <div className={styles.messages__container}>
                    {
                        messages.length > 0 && messages.map(msg => {
                            const { fullDate: msgDate } = getTimes(msg.created_at)

                            const Item = (
                                <React.Fragment key={msg.message_id}>
                                    {currentFullDate !== msgDate ? <MessageDate text={msgDate} /> : <></>}
                                    {firstNewMessageId === msg.message_id ? <MessageDate text={'new Message'} /> : <></>}
                                    <MessageItem message={msg} />
                                </React.Fragment>
                            )

                            currentFullDate = currentFullDate !== msgDate ? msgDate : currentFullDate

                            return Item
                        })
                    }
                </div>
                <ScrollButton />
            </div>
            <Footer />
        </div>
    );
}

export default Messages;