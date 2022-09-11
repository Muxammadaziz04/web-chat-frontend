import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Item from "./Item";
import Header from './Header';
import Search from "./Search";
import Loader from "../Loader";
import { socket } from "../../socket";
import DeafultChatsComponent from "./DefaultChatsComponent";
import { newMessage } from "../../redux/actions/dialogsAction";

import style from './Chats.module.scss'


const Chats = () => {
    const dispatch = useDispatch()
    const { dialogs, loading } = useSelector(state => state.dialogsReducer)

    const func = useCallback(data => {
        setTimeout(() => {
            dispatch(newMessage(data))
        }, 0)
    }, [dispatch])

    useEffect(() => {
        socket.on('NEW_MESSAGE', func)
        return () => socket.off('NEW_MESSAGE', func)
    }, [func])
    
    return (
        <aside className={style.chats}>
            <Header />
            <Search />
            <div className={style.chats__container}>
                <h2 className={style.chats__title}>Messages</h2>
                <ul className={style.chats__list}>
                    {
                        loading ? <Loader /> :
                            dialogs && dialogs.length ?
                                dialogs.map(user => <Item chat={user} key={user.dialog_id} />)
                                : <DeafultChatsComponent />
                    }
                </ul>
            </div>
        </aside>
    );
}

export default React.memo(Chats);