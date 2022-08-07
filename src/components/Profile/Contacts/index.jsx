import style from './Contacts.module.scss'

const Contacts = () => {
    return (
        <div className={style.contacts}>
            <div className={style.contacts__img}>
                <img
                    src='https://images.unsplash.com/photo-1659348448223-e0d51c69d43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
                    alt="profile img"
                />
            </div>
            <p className={style.contacts__name}>Lara Mueller</p>
            <p className={style.contacts__contact}>+49 1522 792358</p>
        </div>
    );
}

export default Contacts;
