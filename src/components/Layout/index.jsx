import { Outlet } from "react-router-dom";

import Chats from "../Chats";

import style from './Layout.module.scss'

const Layout = () => {

    return (
        <main className={style.main}>
            <Chats />
            <div className={style.dialogContainer}>
                <Outlet />
            </div>
        </main>
    );
}

export default Layout;
