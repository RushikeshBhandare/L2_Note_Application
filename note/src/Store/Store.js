import { createStore } from "redux";
import { combineReducers } from "redux";
// import addReducer from "../reducers/reducers"
import NoteReducer from "./Reducers/NoteReducer";

const redudcer = combineReducers({
    NoteReducer: NoteReducer
})
const Store = createStore(redudcer)

export default Store