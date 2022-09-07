import React, { useEffect, useState, useRef, useCallback, useLayoutEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./Header";
import Footer from "./Footer";
import Loader from "../Loader";
import Profile from "../Profile";
import ScrollButton from './ScrollButton'
import RenderMessages from "./RenderMessages";
import { socket } from "../../socket";
import { host, token, user_id } from '../../constants'

import styles from './Messages.module.scss';

const Messages = () => {
    const scrollToRef = useRef(0)
    const containerRef = useRef()
    const prevScrollpos = useRef(0)
    const dispatch = useDispatch()
    const { companion_id } = useParams()
    const [messages, setMessages] = useState([])
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [companion, setCompanion] = useState({})

    const newMessage = useCallback(data => {
        companion_id === data.companion_id && setMessages(state => [...state, data.data])
        setVisible(true)
    }, [companion_id])

    const handleScroll = () => {
        const currentScrollPos = containerRef.current.scrollTop
        const currentScrollPosWithBottom = containerRef?.current?.scrollTop + containerRef?.current?.clientHeight
        const scrollHeight = containerRef?.current?.scrollHeight

        if (prevScrollpos.current > currentScrollPos || currentScrollPosWithBottom === scrollHeight) {
            scrollToRef.current = {scrollPos: currentScrollPos, direction: 'top'}
            setVisible(false)
        } else {
            scrollToRef.current = {...scrollToRef.current, direction: 'bottom'}
        }
        
        if(scrollToRef.current.direction === 'bottom' && (currentScrollPos - scrollToRef.current.scrollPos) >= 300){
            setVisible(true)
        }
        prevScrollpos.current = currentScrollPos;
    }

    const scrollHeight = useMemo(() => {
        const positionObj = JSON.parse(localStorage.getItem('scrollPos'))
        const firstNewMessageId = messages?.find(msg => !msg.viewed && msg.message_from !== user_id)?.message_id || null
        if(positionObj){
            return positionObj[companion_id]
        } else if (firstNewMessageId) {
            const msg = document.getElementById(firstNewMessageId)
            return msg?.offsetTop
        } else {
            return containerRef.current?.scrollHeight
        }
    }, [messages, companion_id])    

    useEffect(() => {
        const positionObj = JSON.parse(localStorage.getItem('scrollPos')) || {}
        positionObj[companion_id] = containerRef.current.scrollTop
        localStorage.setItem('scrollPos', JSON.stringify(positionObj))
    }, [companion_id])

    useEffect(() => {
        socket.on('NEW_MESSAGE', newMessage)
        return () => socket.off('NEW_MESSAGE', newMessage)
    }, [newMessage])

    useLayoutEffect(() => {
        containerRef.current.scrollTo({ top: scrollHeight })
    }, [scrollHeight])

    useEffect(() => {
        setLoading(true)
        fetch(`${host}/messages/${companion_id}`, { headers: { 'Content-Type': 'application/json', token } })
            .then(res => res.json())
            .then(res => {
                setCompanion(res.data.user)
                setMessages(res.data.messages)
                setLoading(false)
            })
            .catch(() => alert('Somethink went wrong. Please try again'))
    }, [companion_id, dispatch])

    return (
        <>
            <div className={styles.messages}>
                <Header user={companion} />
                <div className={styles.messages__btnwrapper}>
                    <div className={styles.messages__container} ref={containerRef} onScroll={handleScroll}>
                        {
                            loading ? <Loader width={140} /> :
                                messages?.length > 0 && <RenderMessages messages={messages} />
                        }
                    </div>
                    {visible && <ScrollButton containerRef={containerRef} visible={visible} />}
                </div>
                <Footer setMessages={setMessages} />
            </div>
            <Profile user={companion} />
        </>
    );
}

export default React.memo(Messages);