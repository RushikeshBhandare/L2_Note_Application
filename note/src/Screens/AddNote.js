import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AppContainer from '../Components/AppContainer'
import AppHeader from '../Components/AppHeader'
import { attach } from '../Helper/Images'
import ImagePicker from 'react-native-image-crop-picker';


const AddNote = () => {
    const [imageData, setImageData] = useState('')
    const onPressBack = () => {
        console.log("back");
    } 

    const onPressAttachment = () => {
        try{
            console.log('trying ')
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
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>clear</Text>
                </TouchableOpacity>
            </View>
            <Image
                source={{uri: imageData}}
                style={styles.attachedImage}
            />
        </View>
        )
    }

    const renderSaveBtn = () => {
        return(
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.saveBtnStyle}>
                    <Text style={styles.saveBtnText}>save</Text>
                </TouchableOpacity> 
            </View>
        )
    }
 
    return (
    <View>
        <AppHeader
            isBack={true}
            onPressBack={onPressBack}
            showRightBtn={true}
            rightBtnImage = {attach}
            onPressRightBtn={onPressAttachment}
        />
        <ScrollView>
            <AppContainer>

                <TextInput
                    placeholder='Title'
                    style={styles.title}
                />

                <TextInput
                    placeholder='description'
                    style={styles.desc}
                    multiline
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
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: 'white',
        elevation: 10,
        marginVertical: 10,
        borderRadius :10,
        padding: 10
    },
    desc: {
        fontSize: 16,
        backgroundColor: 'white',
        elevation: 10,
        borderRadius :10,
        padding: 10
    },
    attachedImage: {
        width: '100%',
        height: 400,
        borderRadius: 10
    },
    imageContainer: {
        backgroundColor: 'white',
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
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10
    },
    saveBtnText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    }   
})

export default AddNote