import { host, token } from "../constants"

import { changeStatus, setDialogs } from "../redux/actions/dialogsAction"

const userJoin = (socket, dialogs) => {
    socket.emit('USER_JOIN', {
        user_id: JSON.parse(localStorage.getItem('user_id')) || '0912eee5-1b21-4b4e-82c4-af4439be2d03',
        id: socket.id,
        companions: dialogs?.map(dialog => dialog.companion[0].user_id)
    })
}

export const userConnect = async (socket, dispatch)=> {
    dispatch(setDialogs({data: [], loading: true}))
    let res = await fetch(`${host}/dialogs`, { headers: { token } })
    res = await res.json()
    dispatch(setDialogs({dialogs: res.data.dialogs, loading: false}))
    userJoin(socket, res.data.dialogs)
}

export const newUser = (data, dispatch) => dispatch(changeStatus(data))
export const leaveUser = (data, dispatch) => dispatch(changeStatus(data))