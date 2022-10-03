import { useEffect, useCallback, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from './components/Layout'
import DefaultMessageComponent from './components/Messages/DefaultMessageComponent'
import Messages from './components/Messages'
import Register from "./components/Authorization/Register";
import Login from "./components/Authorization/Login";
import Verification from "./components/Authorization/Verification";
import { host } from './constants'
import { socket } from "./socket";
import { leaveUser, newUser, userJoin } from "./socket/user.socket";

function App() {
  const dispatch = useDispatch()
  const prevState = useRef(document.visibilityState)
  const { token } = useSelector(state => state.userReducer)

  socket.on('NEW_USER_ONLINE', data => newUser(data, dispatch))
  socket.on('USER_EXIT', data => leaveUser(data, dispatch))

  const handleVisibilityChange = useCallback(async() => {
    const options = { method: 'PUT', headers: { token } }
    if(prevState.current !== document.visibilityState && document.visibilityState === 'hidden') {
      await fetch(`${host}/leave`, options)
      await socket.disconnect(true);
      prevState.current = document.visibilityState
    } else if (prevState.current !== document.visibilityState && document.visibilityState === 'visible') {
      await fetch(`${host}/online`, options)
      await socket.connect(true);
      await userJoin(socket);
      prevState.current = document.visibilityState
    }
  }, [token])



  useEffect(() => {
    const options = { method: 'PUT', headers: { token } }
    ;(async () => await fetch(`${host}/online`, options))()
    
    window.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', async () => {
      await fetch(`${host}/leave`, options)
    })

    return () => {
      window.removeEventListener('visibiltychange', handleVisibilityChange)
    }
  }, [token, handleVisibilityChange])

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
