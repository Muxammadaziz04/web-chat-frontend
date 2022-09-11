import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Form from '../Form';
import Input from '../Input';
import Button from '../Button';
import { host } from '../../../constants';

import style from '../Authorization.module.scss'

const Login = () => {
    const formRef = useRef()
    const navigate = useNavigate()


    const sendForm = async (e) => {
        e.preventDefault()
        const form = formRef.current
        const body = JSON.stringify({
            email: form.email.value.trim(),
            password: form.password.value.trim(),
        })

        let res = await fetch(`${host}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        })

        res = await res.json()
        if (res.status !== 201) {
            alert(res.error || res.message)
        } else {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            navigate(`/`)
        }
    }


    return (
        <div className={style.authorization}>
            <Form formRef={formRef} onSubmit={sendForm}>
                <h1 className={style.authorization__title}>Log in</h1>
                <Input text='Email' type='email' placeholder='Email (required)' inputMode='email' name='email' />
                <Input text='Password' type='password' placeholder='Password (required)' name='password'/>
                <p className={style.authorization__link}>Don't have an account? <Link to='/login'>Sign up</Link></p>
                <Button text='Login' />
            </Form>
        </div>
    );
}

export default Login;
