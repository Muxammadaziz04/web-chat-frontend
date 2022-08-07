const initialState = {
    chat_id: 0
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case "setChat": return {
            chat_id: action.payload
        };
        default: return state
    }
}

export default chatReducer