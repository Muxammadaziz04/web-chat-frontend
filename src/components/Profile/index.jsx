import { useSelector } from 'react-redux';

import Contacts from './Contacts';
import Header from './Header';
import Info from './Info';

import style from './Profile.module.scss'

const Profile = () => {
    const isOpen = useSelector(state => {
        const { isOpen } = state.contactInfoReducer
        return isOpen
    })

    if(!isOpen) return <></>
    
    return (
        <aside className={style.profile}>
            <Header />
            <Contacts />
            <Info />
        </aside>
    );
}

export default Profile;
