import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { host, token, user_id } from '../../../constants'

import style from './AddChat.module.scss'

const AddChat = ({ isOpen, setIsOpen }) => {
    const inpRef = useRef()
    const navigate = useNavigate()

    const addDialog = async () => {
        try {
            if (inpRef.current.value.trim()) {
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', token },
                    body: JSON.stringify({ companion_email: inpRef.current.value.trim() })
                }
                let res = await fetch(`${host}/dialog`, options)
                res = await res.json()
                if (res.status === 201) {
                    inpRef.current.value = null
                    const companion_id = res.data.dialog_members.find(user => user !== user_id)
                    if (companion_id) navigate(`/dialog/${companion_id}`)
                } else {
                    alert(res.error || res.message)
                }
            }
        } catch (error) {

        }
    }
    return (
        <div className={isOpen ? style.wrapper : style.close} data-item="wrapper" onClick={(e) => e.target.dataset.item === 'wrapper' && setIsOpen(false)}>
            <div className={style.item}>
                <label>
                    email
                    <input type="text" ref={inpRef} />
                </label>
                <button onClick={() => { setIsOpen(false); addDialog() }}>Add</button>
            </div>
        </div>
    );
}

export default AddChat;
