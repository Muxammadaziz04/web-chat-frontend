import { combineReducers, createStore } from "redux";

import contactInfoReducer from "../reducers/contactInfoReducer";
import searchReducer from "../reducers/searchReducer";
import companionReducer from "../reducers/CompanionReducer";
import dialogsReducer from "../reducers/dialogsReducer";

const rootReducer = combineReducers({
    contactInfoReducer,
    searchReducer,
    companionReducer,
    dialogsReducer
})

export const store = createStore(rootReducer)