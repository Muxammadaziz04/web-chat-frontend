import React, { useRef } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import Form from '../Form';
import Input from '../Input';
import Button from '../Button';
import {host, token} from '../../../constants'

import style from '../Authorization.module.scss'

const Register = () => {
    const formRef = useRef()
    const navigate = useNavigate()

    const sendForm = async(e) => {
        e.preventDefault()
        const form = formRef.current
        const body = JSON.stringify({
            first_name: form.first_name.value.trim(),
            last_name: form.last_name.value.trim(),
            email: form.email.value.trim(),
            password: form.password.value.trim(),
        })

        let res = await fetch(`${host}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        })

        res = await res.json()
        if(res.status !== 201){
            alert(res.error || res.message)
        } else {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            navigate(`/`)
        }
    }

    if(token) return <Navigate to='/' />

    return (
        <div className={style.authorization}>
            <Form formRef={formRef} onSubmit={sendForm}>
                <h1 className={style.authorization__title}>Register</h1>
                <Input text='First name' type='text' name='first_name' placeholder='First name (required)' />
                <Input text='Last name' type='text' name='last_name' placeholder='Last name' />
                <Input text='Email' type='email' name='email' placeholder='Email (required)' inputMode='email' />
                <Input text='Password' type='password' name='password' placeholder='Password (required)' />
                <p className={style.authorization__link}>Don't have an account? <Link to='/login'>Sign up</Link></p>
                <Button text='Sign Up'/>
            </Form>
        </div>
    );
}

export default Register;
