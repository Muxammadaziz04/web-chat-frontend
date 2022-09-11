import { combineReducers, createStore } from "redux";

import contactInfoReducer from "../reducers/contactInfoReducer";
import dialogsReducer from "../reducers/dialogsReducer";
import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
    userReducer,
    contactInfoReducer,
    dialogsReducer
})

export const store = createStore(rootReducer)