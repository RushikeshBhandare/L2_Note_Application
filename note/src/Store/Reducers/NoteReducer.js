import { State } from "react-native-gesture-handler"
import AsyncStorage from '@react-native-async-storage/async-storage';

const ADD_NOTE = "ADD_NOTE"
const DELETE_NOTE = "DELETE_NOTE"
const UPDATE_NOTE = "UPDATE_NOTE"
const GET_SINGLE_NOTE = "GET_SINGLE_NOTE"
const GET_DATA_FROM_STORAGE = "GET_DATA_FROM_STORAGE"

const initialState = {
    notes: [],
    singleNote: {}
}

const storeData = async (note) => {
    try {
        const data = JSON.stringify(note)
        await AsyncStorage.setItem('note', data)
    } catch (e) {
        console.log("error ", e);
    }
}


const NoteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'addNote':
            return {
                ...state,
                notes: action.payload
            }
        case 'updateNote':
            return {
                ...state,
                notes: action.payload
            }


        default:
            return state
    }
}

export default NoteReducer