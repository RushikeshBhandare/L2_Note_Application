import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNotes = async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await AsyncStorage.getItem('Notes', data)
            if(data !== null) {
                console.log("data ", data)
                const list = JSON.parse(data) 
                console.log("list ", list );
                console.log("type of list ", typeof(list));
                dispatch({
                    type: 'addNote',
                    payload: list
                })
            }
            resolve()
        } catch (e) {
            reject()
            console.log('error add note ', e);
        }
    })
}

export const addNote = async (payload, dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const date = new Date();
            const time = `${date?.getDate()}.${date?.getMonth()}.${date?.getFullYear()}`
            const note = {
                ...payload,
                id: Math.random(0, 10000),
                time: time,
                title: payload?.title === '' ? time : payload?.title,
            }
            const data = await AsyncStorage.getItem('Notes', data)
            let list = []
            if (data !== null) {
                list = [note, ...JSON.parse(data)]
            } else {
                list = [note]
            }
            console.log("list ", list)
            await AsyncStorage.setItem('Notes', JSON.stringify(list))
            dispatch({
                type: 'addNote',
                payload: list
            })
            resolve()
        } catch (e) {
            reject()
            console.log('error add note ', e);
        }
    })
}

export const updateNote = async (payload, dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await AsyncStorage.getItem('Notes')
            if(data !== null) {
                console.log("pay load ", payload)
                const newArray = JSON.parse(data)?.filter((i)=> i?.id !== payload?.id)
                console.log("new array list ", newArray)
                let  list = [payload, ...newArray]
                console.log("list ", list)
                await AsyncStorage.setItem('Notes', JSON.stringify(list))
                dispatch({
                    type: 'updateNote',
                    payload: list
                })
                resolve()
            }

        } catch (e) {
            reject()
            console.log('error add note ', e);
        }
    })
}

export const deleteNote = async (payload, dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await AsyncStorage.getItem('Notes')
            if(data !== null) {
                console.log("pay load ", payload)
                const newArray = JSON.parse(data)?.filter((i)=> i?.id !== payload?.id)
                console.log("new array list ", newArray)
                let  list = [...newArray]
                console.log("list ", list)
                await AsyncStorage.setItem('Notes', JSON.stringify(list))
                dispatch({
                    type: 'updateNote',
                    payload: list
                })
                resolve()
            }

        } catch (e) {
            reject()
            console.log('error add note ', e);
        }
    })
}