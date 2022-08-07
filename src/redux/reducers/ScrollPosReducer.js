const initialState = {
    pos: 0
}

const scrollPosReducer = (state = initialState, action) => {
    switch (action.type) {
        case "setScrollPos": return {
            pos: action.payload
        };
        default: return state
    }
}


export default scrollPosReducer