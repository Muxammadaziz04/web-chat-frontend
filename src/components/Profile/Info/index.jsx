import React from 'react';

import style from './Info.module.scss'

const Info = ({ user }) => {
    return (
        user?.user_info && (
            <>
                <div className={style.info}>
                    <p className={style.info__title}>Info</p>
                    <p className={style.info__body}>{user?.user_info}</p>
                </div>
            </>
        )
    );
}

export default React.memo(Info);
