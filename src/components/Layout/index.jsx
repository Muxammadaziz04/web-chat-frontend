import Chats from "../Chats";

import style from './Layout.module.scss'

const Layout = ({ children }) => {

    return (
        <main className={style.main}>
            <Chats />
            <div className={style.dialogContainer}>
                {children}
            </div>
        </main>
    );
}

export default Layout;
