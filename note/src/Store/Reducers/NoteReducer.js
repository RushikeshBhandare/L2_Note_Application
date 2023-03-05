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
        console.log("data Added")
    } catch (e) {
        console.log("Error Async Storage ", e);
    }
}


const NoteReducer = (state = initialState, action) => {
    switch (action.type) {
        // case GET_DATA_FROM_STORAGE: {
        //     console.log("get Storage Data Payload ")
        //     return {
        //         ...state,
        //         notes: action.payload.data
        //     }
        // }
        // case ADD_NOTE:
        //     const d = new Date();
        //     let getTime = d.toString()
        //     const note = {
        //         id: Math.random(0, 10000),
        //         time: getTime,
        //         ...action.payload
        //     }
        //     const saveData = [...state.notes, note]
        //     storeData(saveData)
        //     return {
        //         ...state,
        //         notes: [...state.notes, note]
        //     }
        // case DELETE_NOTE:
        //     const id = action.payload.id
        //     const newNotes = state.notes.filter((a) => {
        //         console.log(a)
        //         console.log("payload id ", action.payload.id)
        //         return a.id != action.payload.id
        //     })
        //     storeData(newNotes)

        //     return {
        //         ...State,
        //         notes : newNotes
        //     }



        // case GET_SINGLE_NOTE:
        //               const getSingleNote = state.notes.filter((note) => {
        //         return action.payload.id == note.id
        //     })
        //     return {
        //         ...state,
        //         singleNote: getSingleNote
        //     }
        case 'addNote':
            console.log("calling reducer ")
            return {
                ...state,
                notes: action.payload
            }
        case 'updateNote':
            console.log("calling reducer ")
            return {
                ...state,
                notes: action.payload
            }


        default:
            return state
    }
}

export default NoteReducer