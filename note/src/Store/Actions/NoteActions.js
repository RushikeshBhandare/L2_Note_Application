import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNotes = async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await AsyncStorage.getItem('Notes', data)
            if(data !== null) {
                const list = JSON.parse(data) 
                dispatch({
                    type: 'addNote',
                    payload: list
                })
            }
            resolve()
        } catch (e) {
            reject()
            console.log('error ', e);
        }
    })
}

export const addNote = async (payload, dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const date = new Date();
            const time = `${date?.getDate()}.${date?.getMonth() + 1}.${date?.getFullYear()}`
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
            await AsyncStorage.setItem('Notes', JSON.stringify(list))
            dispatch({
                type: 'addNote',
                payload: list
            })
            resolve()
        } catch (e) {
            reject()
            console.log('error', e);
        }
    })
}

export const updateNote = async (payload, dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await AsyncStorage.getItem('Notes')
            if(data !== null) {
                const newArray = JSON.parse(data)?.filter((i)=> i?.id !== payload?.id)
                let  list = [payload, ...newArray]
                await AsyncStorage.setItem('Notes', JSON.stringify(list))
                dispatch({
                    type: 'updateNote',
                    payload: list
                })
                resolve()
            }

        } catch (e) {
            reject()
            console.log('error', e);
        }
    })
}

export const deleteNote = async (payload, dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await AsyncStorage.getItem('Notes')
            if(data !== null) {
                const newArray = JSON.parse(data)?.filter((i)=> i?.id !== payload?.id)
                let  list = [...newArray]
                await AsyncStorage.setItem('Notes', JSON.stringify(list))
                dispatch({
                    type: 'updateNote',
                    payload: list
                })
                resolve()
            }

        } catch (e) {
            reject()
            console.log('error', e);
        }
    })
}