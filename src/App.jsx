import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

import Layout from './components/Layout'
import DefaultMessageComponent from './components/Messages/DefaultMessageComponent'
import Messages from './components/Messages'
import { host, token } from './constants'
import { setDialogs, changeStatus } from './redux/actions/dialogsAction'

function App() {
  const dispatch = useDispatch()
  const socket = io(host, { transports: ['websocket', 'polling'] });

  socket.on("connect", async () => {
    let res = await fetch(`${host}/dialogs`, { headers: { token } })
    res = await res.json()
    dispatch(setDialogs(res.data))

    socket.emit('join', {
      email: JSON.parse(localStorage.getItem('email')) || 'muxammadazizramziddinov@gmail.com',
      id: socket.id,
      companions: res.data.map(dialog => dialog.companion[0].email)
    })
  });

  socket.on('NEW_USER_ONLINE', data => dispatch(changeStatus({ email: data.user, status: 'online' })))
  socket.on('USER_EXIT', data => dispatch(changeStatus({ email: data.user, status: 'offline' })))

  useEffect(() => {
    const options = { method: 'PUT', headers: { token } }
    ;(async () => await fetch(`${host}/online`, options))()

    window.addEventListener('beforeunload', async () => {
      await fetch(`${host}/leave`, options)
    })
  }, [])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DefaultMessageComponent />} />
          <Route path="/dialog/:dialog_id" element={<Messages />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
