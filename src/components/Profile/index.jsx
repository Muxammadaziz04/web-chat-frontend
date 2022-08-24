import { useSelector } from 'react-redux';

import Contacts from './Contacts';
import Header from './Header';
import Info from './Info';

import style from './Profile.module.scss'

const Profile = () => {
    const isOpen = useSelector(state => state.contactInfoReducer.isOpen)
    const companion = useSelector(state => state.companionReducer)

    if(!isOpen) return <></>
    
    return (
        <aside className={style.profile}>
            <Header />
            <Contacts companion={companion}/>
            <Info />
        </aside>
    );
}

export default Profile;
