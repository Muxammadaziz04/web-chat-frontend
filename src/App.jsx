import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Layout from './components/Layout'
import DefaultMessageComponent from './components/Messages/DefaultMessageComponent'
import Messages from './components/Messages'
import { host, token } from './constants'
import { socket } from "./socket";
import { leaveUser, newUser, userConnect } from "./socket/user.socket";

function App() {
  const dispatch = useDispatch()
  socket.on("connect", () => userConnect(socket, dispatch));
  socket.on('NEW_USER_ONLINE', data => newUser(data, dispatch))
  socket.on('USER_EXIT', data => leaveUser(data, dispatch))

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
          <Route path="/dialog/:companion_id" element={<Messages />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
