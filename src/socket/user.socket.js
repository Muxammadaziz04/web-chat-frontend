import { host, token } from "../constants"

import { changeStatus, setDialogs } from "../redux/actions/dialogsAction"

const userJoin = (socket, dialogs) => {
    socket.emit('USER_JOIN', {
        email: JSON.parse(localStorage.getItem('email')) || 'muxammadazizramziddinov@gmail.com',
        id: socket.id,
        companions: dialogs?.map(dialog => dialog.companion[0].email)
    })
}

export const userConnect = async (socket, dispatch)=> {
    dispatch(setDialogs({data: [], loading: true}))
    let res = await fetch(`${host}/dialogs`, { headers: { token } })
    res = await res.json()
    dispatch(setDialogs({data: res.data, loading: false}))
    userJoin(socket, res.data)
}

export const newUser = (data, dispatch) => dispatch(changeStatus(data))
export const leaveUser = (data, dispatch) => dispatch(changeStatus(data))