const initialState = {}

const companionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_COMPANION": return action.payload;
        default: return state
    }
}

export default companionReducer