import { useDispatch } from 'react-redux';

import SearchIcon from '../../../Assets/search_icon.svg'
import { host, token } from '../../../constants';
import { setSearch } from '../../../redux/actions/dialogsAction';

import style from './Search.module.scss'

const ChatsSearch = () => {
    const dispatch = useDispatch()
    
    const handleChange = async(e) => {
        let res = await fetch(`${host}/search?value=${e.target.value.trim()}`, {headers: {token}})
        res = await res.json()
        if(res.status === 200){
            dispatch(setSearch({dialogs: res?.data?.dialogs || [], finded_users: res?.data?.finded_users || []}))
        } else {
            alert(res.error || res.message)
        }
    }

    return (
        <label className={style.search}>
            <button>
                <img src={SearchIcon} alt="icon" />
            </button>
            <input type="text" placeholder="Search" onChange={handleChange} disabled />
        </label>
    );
}

export default ChatsSearch;
