import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, BackHandler } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppContainer from '../Components/AppContainer'
import AppHeader from '../Components/AppHeader'
import { attach, cancel } from '../Helper/Images'
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux'
import { addNote, updateNote } from '../Store/Actions/NoteActions'
import Fonts from '../Helper/Fonts'
import Colors from '../Helper/Colors'


const AddNote = (props) => {
    const {navigation, route} = props
    const [imageData, setImageData] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const destInputRef = useRef({})

    const dispatch = useDispatch()
    const onPressBack = () => {
        navigation?.pop()
    } 

    useEffect(()=> {
        destInputRef.current?.focus()
    }, [])

    useEffect(()=> {
        if(route?.params?.data) {
            const {desc, imageData, isEdit, title} = route?.params?.data
            setIsEdit(isEdit)
            setImageData(imageData)
            setTitle(title)
            setDesc(desc)
        }
    }, [])

    const onPressAttachment = () => {
        try{
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
              }).then(image => {
                setImageData(image?.path)
              }).catch((e)=>{
                console.log('err', e)
              });

        }catch(e){
            console.log('error ', e)
        }
    }
  
    const onPressClear = () => {
        setImageData('')
    }

    const renderAttachedImage = () => {
        return(
            <View style={styles.imageContainer}>
            <View style={styles.clearbtn}>
                <TouchableOpacity onPress={onPressClear}>
                   <Image
                        source={cancel}
                        style={styles.cancelBtnImage}
                   />
                </TouchableOpacity>
            </View>
            <Image
                source={{uri: imageData}}
                style={styles.attachedImage}
            />
        </View>
        )
    }

    const onPresSave = () => {
        try {
            if(title !== '' || desc !== ''){
                if(isEdit) {
                    updateNote({
                        id: route?.params?.data?.id,
                        title: title,
                        desc: desc,
                        imageData: imageData
                    }, dispatch).then(()=> {
                        navigation?.pop()
                    })
                }else{
                    addNote({
                        title: title,
                        desc: desc,
                        imageData: imageData
                    }, dispatch).then(()=> {
                        navigation?.pop()
                    })
                }
            }
        }catch (e) {
            console.log('error ', e)
        }
    }

    const renderSaveBtn = () => {
        return(
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={onPresSave} style={styles.saveBtnStyle}>
                    <Text style={styles.saveBtnText}>{isEdit ? 'Update' : 'Save'}</Text>
                </TouchableOpacity> 
            </View>
        )
    }
 
    return (
    <View style={styles.rootContainer}>
        <AppHeader
            isBack={true}
            onPressBack={onPressBack}
            showRightBtn={true}
            rightBtnImage = {attach}
            onPressRightBtn={onPressAttachment}
            containerStyle={styles.headerContainerStyle}
        />
        <ScrollView>
            <AppContainer>

                <TextInput
                    placeholder='Title'
                    style={styles.title}
                    value={title}
                    onChangeText={setTitle}
                />

                <TextInput
                    ref={(ref)=> destInputRef.current = ref}
                    placeholder='description'
                    style={styles.desc}
                    multiline
                    value={desc}
                    onChangeText={setDesc}
                />
                
                { imageData !== '' && renderAttachedImage() }
                {renderSaveBtn()}
            </AppContainer>
            {/* </View> */}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: Colors.white,
        flex :1
    },
    headerContainerStyle:{
        paddingHorizontal: 10
    },  
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: Colors.white,
        elevation: 10,
        marginVertical: 10,
        borderRadius :10,
        padding: 10,
        fontFamily: Fonts.bold
    },
    desc: {
        fontSize: 16,
        backgroundColor: Colors.white,
        elevation: 10,
        borderRadius :10,
        padding: 10,
        fontFamily: Fonts.regular
    },
    attachedImage: {
        width: '100%',
        height: 400,
        borderRadius: 10
    },
    imageContainer: {
        backgroundColor: Colors.white,
        elevation: 10,
        padding: 10,
        marginVertical: 10,
        borderRadius: 10
    },
    clearbtn: {
        height: 40,
        alignItems: 'flex-end'
    },
    btnContainer: {
        alignItems: 'flex-end',
        height: 60,
        marginBottom: 100

    },
    saveBtnStyle: {
        width: '30%',
        height: 40,
        backgroundColor: Colors.orenge,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10
    },
    saveBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: Fonts.bold
    },
    cancelBtnImage: {
        width: 20,
        height: 20,
        tintColor: Colors.gray
    } 
})

export default AddNote