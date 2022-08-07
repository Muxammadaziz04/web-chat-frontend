const initialState = {
    text: ''
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'input': return {
            text : action.payload
        } 
        default: return state
    }
}

export default searchReducer