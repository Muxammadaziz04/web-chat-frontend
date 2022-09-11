import React, { useState, useEffect, useRef } from 'react';
import LetteredAvatar from 'react-lettered-avatar';
import { useDispatch } from 'react-redux';

import { host, token, user_id } from '../../../constants';
import camera from '../../../Assets/camera.svg'

import style from './Popup.module.scss'
import Loader from '../../Loader';

const Popup = ({ setVisible }) => {
    const formRef = useRef()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState()
    const [ava, setAva] = useState(null)

    const sendForm = async (e) => {
        e.preventDefault()
        setLoading(true)
        const form = formRef.current
        const fd = new FormData()

        fd.append('first_name', form.first_name.value.trim())
        fd.append('last_name', form.last_name.value.trim())
        fd.append('user_info', form.user_info.value.trim())
        fd.append('img', form.img.files[0])

        const options = { method: 'PUT', headers: { token }, body: fd }
        let res = await fetch(`${host}/user`, options)
        res = await res.json()

        if (res.status === 200) {
            setLoading(false)
            setVisible(false)
            dispatch({ type: 'SET_USER', payload: res.data })
        } else {
            alert(res.error || res.message)
        }
    }

    useEffect(() => {
        fetch(`${host}/user/${user_id}`, { headers: { token } })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data)
                } else {
                    alert(res.error || res.message)
                }
            })
    }, [dispatch])

    return (
        <div className={style.popup} data-item="wrapper" onClick={(e) => e.target.dataset.item === 'wrapper' && setVisible(false)}>
            <form className={style.popup__item} ref={formRef} onSubmit={sendForm}>
                {loading ? <Loader /> : (
                    <>
                        <div className={style.popup__item__img}>
                            {
                                user && (user.user_avatar || ava) ? <img src={ava ? URL.createObjectURL(ava) : user?.user_avatar} alt="user avatar" /> : <LetteredAvatar name={user?.fullname} size={150} />
                            }
                            <label>
                                <img src={camera} alt='icon' />
                                <input type="file" accept='image/*' name='img' onChange={(e) => setAva(e.target.files[0])} />
                            </label>
                        </div>
                        <span className={style.popup__item__text}>
                            <p>First name</p>
                            <input type='text' defaultValue={user?.first_name} name="first_name" />
                        </span>
                        <span className={style.popup__item__text}>
                            <p>Last name</p>
                            <input type='text' defaultValue={user?.last_name} name="last_name" />
                        </span>
                        <span className={style.popup__item__text}>
                            <p>User info</p>
                            <input type='text' defaultValue={user?.user_info} name="user_info" />
                        </span>
                        <button type='submit'>Change</button>
                    </>
                )}
            </form>
        </div>
    );
}

export default Popup;
