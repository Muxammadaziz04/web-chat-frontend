import React from 'react';
import data from '@emoji-mart/data/sets/14/apple.json'
import Picker from '@emoji-mart/react'

import style from './Emoji.module.scss'

const Emoji = ({pickEmoji}) => {
    return (
        <span className={style.emoji}>
            <Picker
                data={data}
                onEmojiSelect={pickEmoji}
                set="apple"
                emojiVersion="14"
                navPosition="bottom"
            />
        </span>
    );
}

export default Emoji;