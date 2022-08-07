import Chats from "../Chats";
import Profile from "../Profile";

import style from './Layout.module.scss'

const Layout = ({ children }) => {

    return (
        <main className={style.main}>
            <Chats/>
            <div className={style.dialogContainer}>
                {children}
            </div>
            <Profile />
        </main>
    );
}

export default Layout;
