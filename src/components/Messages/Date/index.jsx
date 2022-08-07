import style from './Date.module.scss'

const MessagesDate = ({text}) => {
    return (
        <h6 className={style.messages__date}>
            {text}
        </h6>
    );
}

export default MessagesDate;
