import { user_id } from "../../constants"

const initialState = {
    data: [],
    loading: true
}

const changeStatus = (state, payload) => {
    const newData = state.data.map(dialog => {
        const user = dialog.companion[0]
        if (payload.user_id === user.user_id) dialog.companion[0].user_action = payload.status
        return dialog
    })
    return {
        data: newData,
        loading: state.loading
    }
}

const orderDialogs = (state, payload) => {
    let newData = state.data.map(dialog => {
        if (dialog.dialog_id === payload.data.dialog_id) {
            dialog.last_message = [payload.data]
            if (user_id !== payload.data.message_from) {
                dialog.notificate = +dialog.notificate + 1
            }
        }
        return dialog
    })

    newData.forEach((item, index) => {
        if (item.dialog_id === payload.data.dialog_id) {
            newData.unshift(item);
            newData.splice(index+1, 1);
        }
    });

    return { data: newData, loading: state.loading }
}

const msgViewed = (state, payload) => {
    const newData = state.data.map(dialog => {
        if (dialog.dialog_id === payload.dialog_id) {
            dialog.notificate = dialog.notificate - 1
        }
        return dialog
    })
    return {
        data: newData,
        loading: state.loading
    }
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DIALOGS": return action.payload;
        case "CHANGE_STATUS": return changeStatus(state, action.payload);
        case "NEW_MESSAGE": return orderDialogs(state, action.payload);
        case "MSG_VIEWED": return msgViewed(state, action.payload);
        default: return state
    }
}

export default dialogsReducer