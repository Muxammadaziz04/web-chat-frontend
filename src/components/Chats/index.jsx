import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Item from "./Item";
import Header from './Header';
import Search from "./Search";
import { host, token } from '../../constants'

import style from './Chats.module.scss'
import DeafultChatsComponent from "./DefaultChatsComponent";
import Loader from "../Loader";


const Chats = () => {
    const [dialogs, setDialogs] = useState([])
    const [loader, setLoader] = useState(true)

    // const inputValue = useSelector(state => {
    //     const { text } = state.searchReducer
    //     return text
    // })

    useEffect(() => {
        const getDialogs = async () => {
            setLoader(true)
            let res = await fetch(`${host}/dialogs`, {
                headers: { token }
            })

            res = await res.json()

            if(res.status === 200){
                setDialogs(res.data)
                setLoader(false)
            } else {
                alert('Somethink went wrong. Please reload the app')
            }
        }
        getDialogs()
    }, [])
    
    return (
        <aside className={style.chats}>
            <Header />
            <Search />
            <div className={style.chats__container}>
                <h2 className={style.chats__title}>Messages</h2>
                <ul className={style.chats__list}>
                    {
                        loader ? <Loader /> : 
                        dialogs && dialogs.length ? dialogs.map(dialog => <Item chat={dialog} key={dialog.dialog_id}/>)
                        : <DeafultChatsComponent />
                    }
                </ul>
            </div>
        </aside>
    );
}

export default Chats;