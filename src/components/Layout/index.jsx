import { useCallback, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Navigate, useParams } from "react-router-dom";

import { host, token } from "../../constants";
import Chats from "../Chats";

import style from './Layout.module.scss'

const Layout = () => {
    const dispatch = useDispatch()
    const { companion_id } = useParams()

    const getUserInfo = useCallback(async () => {
        let res = await fetch(`${host}/userinfo`, { headers: { token } })
        res = await res.json()
        if (res.status === 200) {
            localStorage.setItem('user_id', JSON.stringify(res.data?.user_id))
            dispatch({ type: 'SET_USER', payload: res.data })
        } else {
            alert(res.error || res.message)
        }
    }, [dispatch])

    useLayoutEffect(() => {
        getUserInfo()
    }, [getUserInfo])

    if (!token) return <Navigate to='/login' />

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
