import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Item from "./Item";
import Header from './Header';
import Search from "./Search";

import style from './Chats.module.scss'


const Chats = () => {
    const [filteredUsers, setFilteredUsers] = useState([])

    const inputValue = useSelector(state => {
        const { text } = state.searchReducer
        return text
    })

    useEffect(() => {
        // setFilteredUsers(users?.filter(user => user.full_name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase().trim())))
    }, [inputValue])
    
    return (
        <aside className={style.chats}>
            <Header />
            <Search />
            <div className={style.chats__container}>
                <h2 className={style.chats__title}>Messages</h2>
                <ul className={style.chats__list}>
                    {
                        // dialogs?.map(dialog => <Item chat={dialog} key={dialog.dialog_id}/>)
                    }
                </ul>
            </div>
        </aside>
    );
}

export default Chats;