import style from './NotFound.module.scss'

const NotFound = ({text}) => {
    return (
        <div className={style.notFound}>
            <p>{text}</p>
        </div>
    );
}

export default NotFound;
