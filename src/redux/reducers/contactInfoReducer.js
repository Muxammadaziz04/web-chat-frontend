const initialState = {
    isOpen: true
}

const contactInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'openContactInfo': return {
            isOpen: true
        }
        case 'closeContactInfo': return {
            isOpen: false
        }
        default: return state
    }
}

export default contactInfoReducer