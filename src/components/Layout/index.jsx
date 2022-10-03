import { useCallback, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useParams } from "react-router-dom";

import { host } from "../../constants";
import { socket } from "../../socket";
import Chats from "../Chats";
import { userConnect } from "../../socket/user.socket";

import style from './Layout.module.scss'

const Layout = () => {
    const dispatch = useDispatch()
    const { companion_id } = useParams()
    const localToken = JSON.parse(localStorage.getItem('token'))
    const { token } = useSelector(state => state.userReducer)

    const getUserInfo = useCallback(async () => {
        if(!localToken) return
        userConnect(socket, dispatch)
        let res = await fetch(`${host}/userinfo`, { headers: { token } })
        res = await res.json()
        if (res.status === 200) {
            localStorage.setItem('user_id', JSON.stringify(res.data?.user_id))
            dispatch({ type: 'SET_USER', payload: res.data })
        } else {
            alert(res.error || res.message)
        }
    }, [dispatch, token, localToken])

    useLayoutEffect(() => {
        getUserInfo()
    }, [getUserInfo])

    if (!localToken) return <Navigate to='/register' />

    return (
        <main className={style.main}>
            <Chats />
            {
                companion_id && (
                <div className={style.dialogContainer}>
                    <Outlet />
                </div>
                )
            }
        </main>
    );
}

export default Layout;
