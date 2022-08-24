import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Item from "./Item";
import Header from './Header';
import Search from "./Search";

import style from './Chats.module.scss'
import DeafultChatsComponent from "./DefaultChatsComponent";
import Loader from "../Loader";


const Chats = () => {
    const [loader, setLoader] = useState(false)

    const dialogs = useSelector(state => state.dialogsReducer)
    console.log(dialogs);
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

    return (
        <aside className={style.chats}>
            <Header />
            <Search />
            <div className={style.chats__container}>
                <h2 className={style.chats__title}>Messages</h2>
                <ul className={style.chats__list}>
                    {
                        loader ? <Loader /> :
                            dialogs && dialogs.length ? dialogs.map(dialog => <Item chat={dialog} key={dialog.dialog_id} />)
                                : <DeafultChatsComponent />
                    }
                </ul>
            </div>
        </aside>
    );
}

export default Chats;