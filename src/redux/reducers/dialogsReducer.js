const initialState = []

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DIALOGS": return action.payload;
        case "CHANGE_STATUS": return state.map(dialog => {
            const user = dialog.companion[0]
            if(action.payload.email === user.email) user.user_action = action.payload.status
            return dialog
        });
        default: return state
    }
}

export default dialogsReducer