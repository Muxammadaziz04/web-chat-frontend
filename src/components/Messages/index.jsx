import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import MessageItem from "./Item";
import Header from "./Header";
import Footer from "./Footer";
import MessageDate from "./Date";
import ScrollButton from './ScrollButton'
import { host, token } from '../../constants'
import getTimes from "../../Utils";
import Profile from "../Profile";
import { setCompanionAction } from '../../redux/actions/CompanionAction'
import { socket } from "../../socket";
import Loader from "../Loader";

import styles from './Messages.module.scss';

const Messages = () => {
    const dispatch = useDispatch()
    const { companion_id } = useParams()
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [companion, setCompanion] = useState({})

    let { fullDate: currentFullDate } = getTimes(new Date())
    const firstNewMessageId = messages?.find(msg => !msg.viewed)?.message_id || 0

    const newMessage = data => setMessages(state => [...state, data])

    useEffect(() => {
        socket.on('NEW_MESSAGE', newMessage)
        return () => socket.off('NEW_MESSAGE', newMessage)
    }, [])

    useEffect(() => {
        setLoading(true)
        fetch(`${host}/messages/${companion_id}`, { headers: { 'Content-Type': 'application/json', token } })
            .then(res => res.json())
            .then(res => {
                setCompanion(res.data.user)
                setMessages(res.data.messages)
                dispatch(setCompanionAction({
                    companion_email: res.data.user.email,
                    dialog_id: res.data.dialog_id.dialog_id
                }))
                setLoading(false)
            })
            .catch(error => alert('Somethink went wrong. Please try again'))
    }, [companion_id, dispatch])

    return (
        <>
            <div className={styles.messages}>
                <Header user={companion} />
                <div className={styles.messages__btnwrapper}>
                    <div className={styles.messages__container}>
                        {
                            loading ? <Loader /> :
                            messages?.length > 0 && messages?.map(msg => {
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
                <Footer setMessages={setMessages} />
            </div>
            <Profile user={companion} />
        </>
    );
}

export default React.memo(Messages);