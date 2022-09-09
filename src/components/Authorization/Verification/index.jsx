import React, { useRef } from 'react';
import Button from '../Button';

import style from './Verification.module.scss'

const Verification = () => {
    const inputsRef = useRef()

    const handleOtp = (e) => {
        const  inputs = Array.from(inputsRef.current.code)
        const input = e.target
        const value = input.value
        input.value = ''
        input.value = value ? value[0] : ''
        const fieldIndex = input.dataset.index

        if(value.length > 0 && fieldIndex < inputs.length){
            input.nextElementSibling.focus()
        }

        if(e.key === 'Backspace' && fieldIndex - 1 > 0){
            input.previousElementSibling.focus()
        }

        if(fieldIndex === inputs.length) {
            handleSubmit()
        }
    }

    const handleOnPasteOtp = (e) => {
        const  inputs = Array.from(inputsRef.current.code)
        const data = e.clipboardData.getData('text')
        const value = data.split('')
        if(value.length === inputs.length){
            inputs.forEach((input, index) => {
                input.value = value[index]
            })
            handleSubmit()
        }
    }

    const handleSubmit = () => {
        const  inputs = Array.from(inputsRef.current.code)
        let otp = ''

        inputs.forEach(input => {
            otp += input.value
            input.disabled = true
        })

        console.log(otp);
    }

    return (
        <div className={style.verification}>
            <h1>Email Verification</h1>
            <p>Please type the verification codesent to +91 1234567890 </p>
            <form className={style.verification__field} ref={inputsRef}>
                <input type="text" maxLength={1} data-index={1} onKeyUp={handleOtp} onPaste={handleOnPasteOtp} name='code' />
                <input type="text" maxLength={1} data-index={2} onKeyUp={handleOtp} onPaste={handleOnPasteOtp} name='code' />
                <input type="text" maxLength={1} data-index={3} onKeyUp={handleOtp} onPaste={handleOnPasteOtp} name='code' />
                <input type="text" maxLength={1} data-index={4} onKeyUp={handleOtp} onPaste={handleOnPasteOtp} name='code' />
            </form>
            <Button text={'Continue'} />
        </div>
    );
}

export default Verification;