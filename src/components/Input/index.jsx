import style from './Input.module.scss'

const Input = ({type, placeholder}) => {
    return (
        <input type={type} className={style.input} placeholder={placeholder}/>
    );
}

export default Input;