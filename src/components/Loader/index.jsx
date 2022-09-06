import React from 'react';

import spinner from '../../Assets/Spinner.svg'

import style from './Loader.module.scss'

const Loader = ({width = 100}) => {
    return (
        <div className={style.block}>
            <img src={spinner} style={{"width": width}} alt={'loader'} />
        </div>
    );
}

export default Loader;
