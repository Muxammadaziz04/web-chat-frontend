import React, { useRef, useEffect } from 'react';
import data from '@emoji-mart/data'
import { init } from 'emoji-mart'

import style from './CustomInput.module.scss'

const CustomInput = () => {
    init({ data })
    const inpRef = useRef()

    const handlePaste = (e) => {
        e.preventDefault()
        const text = e.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
    }
    
    useEffect(() => {
        inpRef.current.focus()
    }, [])

    return (
        <div
            className={style.input}
            ref={inpRef}
            onPaste={handlePaste}
            contentEditable="true"
            data-input="input"
            suppressContentEditableWarning={true}
            data-placeholder="Message..."
        >
        </div>
    );
}

export default CustomInput;