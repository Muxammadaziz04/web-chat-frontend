const initialState = {
    data: [],
    loading: true
}

const changeStatus = (state, action) => {
    const newData = state.data.map(dialog => {
        const user = dialog.companion[0]
        if (action.payload.user === user.email) dialog.companion[0].user_action = action.payload.status
        return dialog
    })
    return {
        data: newData,
        loading: state.loading
    }
}

const orderDialogs = (state, action) => {
    const newData = state.data.map(dialog => dialog.dialog_id === action.payload.dialog_id ? {last_message: action.payload, ...dialog} : dialog)
    console.log(newData);
    return {data: newData, loading: state.loading}
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DIALOGS": return action.payload;
        case "CHANGE_STATUS": return changeStatus(state, action);
        case "NEW_MESSAGE": return orderDialogs(state, action);
        default: return state
    }
}

export default dialogsReducer