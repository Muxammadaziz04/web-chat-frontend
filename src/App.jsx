import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Layout from './components/Layout'
import DefaultMessageComponent from './components/Messages/DefaultMessageComponent'
import Messages from './components/Messages'
import Register from "./components/Authorization/Register";
import Login from "./components/Authorization/Login";
import Verification from "./components/Authorization/Verification";
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
      ; (async () => await fetch(`${host}/online`, options))()

    window.addEventListener('beforeunload', async () => {
      await fetch(`${host}/leave`, options)
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="" element={<DefaultMessageComponent />} />
          <Route path="dialog/:companion_id" element={<Messages />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification/:user_id" element={<Verification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
