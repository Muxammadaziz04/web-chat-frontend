import { useDispatch } from 'react-redux';

import searchAction from '../../../redux/actions/searchAction';
import SearchIcon from '../../../Assets/search_icon.svg'

import style from './Search.module.scss'

const ChatsSearch = () => {
    const dispatch = useDispatch()
    
    const { input } = searchAction
    
    const handleChange = (e) => {
        dispatch(input(e.target.value))
    }

    return (
        <label className={style.search}>
            <button>
                <img src={SearchIcon} alt="icon" />
            </button>
            <input type="text" placeholder="Search" onChange={handleChange} />
        </label>
    );
}

export default ChatsSearch;
