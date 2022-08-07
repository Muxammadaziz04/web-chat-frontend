import { useDispatch } from 'react-redux';

import contactActions from '../../../redux/actions/contactInfoAction'
import closeIcon from '../../../Assets/close.svg'

import style from './header.module.scss'

const Header = () => {
    const dispatch = useDispatch()

    const { closeContactInfo } = contactActions

    return (
        <div className={style.header}>
            <button onClick={() => dispatch(closeContactInfo())}>
                <img src={closeIcon} alt="icon" />
            </button>
            <p>Contact info</p>
        </div>
    );
}

export default Header;
