const initialState = {
    token: JSON.parse(localStorage.getItem('token')),
    user_id: JSON.parse(localStorage.getItem('user_id'))
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER': return {...state, ...action.payload }
        default: return state
    }
}

export default userReducer