const initialState = {
    isOpen: false,
    newMessage: 0
}

const ButtonToScrollReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'open': return {
            ...state,
            isOpen: true
        };
        case 'close': return {
            ...state,
            isOpen: false
        };
        case 'newMessage': return {
            isOpen: true,
            newMessage: action.payload
        };  
        default: return state
    }
}


export default ButtonToScrollReducer