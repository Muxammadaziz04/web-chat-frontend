import React from 'react';

import style from './Info.module.scss'

const Info = () => {
    return (
        <div className={style.info}>
            <p className={style.info__title}>Info</p>
            <p className={style.info__body}>Spring is coming 🌱</p>
        </div>
    );
}

export default React.memo(Info);
