import style from './Date.module.scss'

const DateItem = ({date}) => {
    return (
        <h6 className={style.messages__date}>
            {date}
        </h6>
    );
}

export default DateItem;
