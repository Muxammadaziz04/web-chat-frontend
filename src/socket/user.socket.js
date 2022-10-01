import { host } from "../constants"

import { changeStatus, setDialogs } from "../redux/actions/dialogsAction"

export const userJoin = async socket => {
    const token = JSON.parse(localStorage.getItem('token'))
    let res = await fetch(`${host}/dialogs`, { headers: { token } })
    res = await res.json()
    if(res.status === 200) {
        socket.emit('USER_JOIN', {
            user_id: JSON.parse(localStorage.getItem('user_id')),
            companions: res.data.dialogs?.map(dialog => dialog.companion[0]?.user_id)
        })
    }
}

export const userConnect = async (socket, dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'))
    dispatch(setDialogs({ dialogs: [], loading: true }))
    let res = await fetch(`${host}/dialogs`, { headers: { token } })
    res = await res.json()
    if (res.status === 200) {
        dispatch(setDialogs({ dialogs: res.data.dialogs || [], loading: false }))
        userJoin(socket)
    }
}

export const newUser = (data, dispatch) => dispatch(changeStatus(data))
export const leaveUser = (data, dispatch) => dispatch(changeStatus(data))