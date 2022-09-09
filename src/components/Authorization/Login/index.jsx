import React from 'react';
import { Link } from 'react-router-dom';

import Form from '../Form';
import Input from '../Input';
import Button from '../Button';

import style from '../Authorization.module.scss'

const Login = () => {
    return (
        <div className={style.authorization}>
            <Form>
                <h1 className={style.authorization__title}>Log in</h1>
                <Input text='Email' type='email' placeholder='Email (required)' inputMode='email' />
                <Input text='Password' type='password' placeholder='Password (required)' />
                <p className={style.authorization__link}>Don't have an account? <Link to='/login'>Sign up</Link></p>
                <Button text='Login'/>
            </Form>
        </div>
    );
}

export default Login;
