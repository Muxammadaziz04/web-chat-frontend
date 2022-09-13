import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { host, token, user_id } from '../../../constants'
import { newMessage } from '../../../redux/actions/dialogsAction';

import style from './AddChat.module.scss'

const AddChat = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm({ mode: "onChange", })

    const addDialog = async (data) => {
        try {
            setIsOpen(false)
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token },
                body: JSON.stringify(data)
            }
            let res = await fetch(`${host}/dialog`, options)
            res = await res.json()
            
            if (res.status === 201) {
                const companion_id = res.data.dialog_members.find(user => user !== user_id)
                if (companion_id) navigate(`/dialog/${companion_id}`)
                console.log(res.data);
                dispatch(newMessage({...res.data, user: res.data.companion[0], data: {dialog_id :res.data.dialog_id}}))
                reset()
            } else {
                alert(res.error || res.message)
            }
        } catch (error) {

        }
    }
    return (
        <div className={isOpen ? style.wrapper : style.close} data-item="wrapper" onClick={(e) => e.target.dataset.item === 'wrapper' && setIsOpen(false)}>
            <form className={style.item} onSubmit={handleSubmit(addDialog)}>
                <label>
                    email
                    <input type="text" {...register('companion_email', {required: "Email is required", pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"})} />
                    <span>{errors?.companion_email && (errors.companion_email.message || "Error")}</span>
                </label>
                <button disabled={!isValid}>Add</button>
            </form>
        </div>
    );
}

export default AddChat;
