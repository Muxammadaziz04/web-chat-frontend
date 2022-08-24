import style from './Date.module.scss'

const MessageDate = ({text}) => {
    return (
        <h6 className={style.messages__date}>
            {text}
        </h6>
    );
}

export default MessageDate;
