import { combineReducers, createStore } from "redux";

import contactInfoReducer from "../reducers/contactInfoReducer";
import dialogsReducer from "../reducers/dialogsReducer";

const rootReducer = combineReducers({
    contactInfoReducer,
    dialogsReducer
})

export const store = createStore(rootReducer)