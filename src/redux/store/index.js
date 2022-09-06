import { combineReducers, createStore } from "redux";

import contactInfoReducer from "../reducers/contactInfoReducer";
import searchReducer from "../reducers/searchReducer";
import dialogsReducer from "../reducers/dialogsReducer";

const rootReducer = combineReducers({
    contactInfoReducer,
    searchReducer,
    dialogsReducer
})

export const store = createStore(rootReducer)