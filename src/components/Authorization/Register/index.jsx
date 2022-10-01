import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Form from '../Form';
import Input from '../Input';
import Button from '../Button';
import { host } from '../../../constants'

import style from '../Authorization.module.scss'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm({ mode: "onChange", })

    const sendForm = async (data) => {
        const body = JSON.stringify(data)
        let res = await fetch(`${host}/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
        res = await res.json()

        if (res.status === 201) {
            localStorage.setItem('token', JSON.stringify(res.token))
            localStorage.setItem('user_id', JSON.stringify(res.user.user_id))
            dispatch({type: "SET_USER", payload: {token: res.token, user_id: res.user.user_id}})
            navigate(`/`)
            reset()
        } else {
            alert(res.error || res.message)
        }
    }

    return (
        <div className={style.authorization}>
            <Form onSubmit={handleSubmit(sendForm)}>
                <h1 className={style.authorization__title}>Register</h1>
                <Input text='First name' type='text' name='first_name' placeholder='First name (required)'
                    register={{ ...register('first_name', { required: "First name is required" }) }} errors={errors} />
                <Input text='Last name' type='text' name='last_name' placeholder='Last name'
                    register={{ ...register('last_name') }} />
                <Input text='Email' type='email' name='email' placeholder='Email (required)' inputMode='email'
                    register={{ ...register('email', { required: "Email is required", pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" }) }} errors={errors} />
                <Input text='Password' type='password' name='password' placeholder='Password (required)'
                    register={{ ...register('password', { required: "Password is required", minLength: { value: 8, message: "Min length 8" } }) }} errors={errors} />
                <p className={style.authorization__link}>Do you have an account? <Link to='/login'>Log in</Link></p>
                <Button text='Sign Up' disabled={isValid} />
            </Form>
        </div>
    );
}

export default Register;
