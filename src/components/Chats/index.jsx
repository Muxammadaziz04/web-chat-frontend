import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Item from "./Item";
import Header from './Header';
import Search from "./Search";
import Loader from "../Loader";
import { socket } from "../../socket";
import DeafultChatsComponent from "./DefaultChatsComponent";

import style from './Chats.module.scss'
import { newMessage } from "../../redux/actions/dialogsAction";
import { useCallback } from "react";


const Chats = () => {
    const dispatch = useDispatch()
    const { data: dialogs, loading } = useSelector(state => state.dialogsReducer)

    // useEffect(() => {
    //     setLoader(true)
    //     fetch(`${host}/dialogs`, { headers: { token } })
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.status === 200) {
    //                 setDialogs(res.data)
    //                 setLoader(false)
    //             } else {
    //                 alert('Somethink went wrong. Please reload the app')
    //             }
    //         })
    // }, [])

    const func = useCallback(data => {
        dispatch(newMessage(data))
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
                                dialogs.map(dialog => <Item chat={dialog} key={dialog.dialog_id} />)
                                : <DeafultChatsComponent />
                    }
                </ul>
            </div>
        </aside>
    );
}

export default React.memo(Chats);