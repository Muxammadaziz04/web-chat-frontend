import { combineReducers, createStore } from "redux";

import contactInfoReducer from "../reducers/contactInfoReducer";
import searchReducer from "../reducers/searchReducer";
import ButtonToScrollReducer from "../reducers/ButtontToScrollReducer";
import scrollPosReducer from "../reducers/ScrollPosReducer";
import chatReducer from "../reducers/ChatReducer";

const rootReducer = combineReducers({
    contactInfoReducer,
    searchReducer,
    ButtonToScrollReducer,
    scrollPosReducer,
    chatReducer
})

export const store = createStore(rootReducer)