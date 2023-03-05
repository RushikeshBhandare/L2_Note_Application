import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { deleteImage, home, share } from '../Helper/Images'
import Fonts from '../Helper/Fonts'
import Colors from '../Helper/Colors'

const BottomOptionModal = ({
    onPressClose,
    onPressShare,
    onPressDelete,
    isVisible
}) => {

    const renderSeprater = () => {
        return (
            <View style={styles.seprater}/>
        )
     }
  return (
    <Modal
        transparent={true}
        style={styles.rootContainer}
        visible={isVisible}
    >
        <View
            style={styles.mainContainer}
        >
            <TouchableOpacity onPress={onPressClose} style={{flex: 1}}/>
            <View style={styles.bottomContainer}>
                <View style={styles.closeOptionContainer}>
                    <TouchableOpacity onPress={onPressClose}>
                        <Text>--------</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.option}
                    onPress={onPressShare}
                >
                    <Image
                        style={styles.optionImage}
                        source={share}
                    />
                    <Text style={styles.optionText}>
                        Share Note
                    </Text>
                </TouchableOpacity>
                {renderSeprater()}
                <TouchableOpacity
                    style={styles.option}
                    onPress={onPressDelete}
                >
                    <Image
                        style={styles.optionImage}
                        source={deleteImage}
                    />
                    <Text style={styles.optionText}>
                        Delete Note
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    </Modal>
  )
}

BottomOptionModal.defaultProps = {
    onPressClose: () => {},
    onPressShare: () => {},
    onPressDelete: () =>{},
    isVisible: false
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'flex-end',
    },
    bottomContainer: {
        backgroundColor: Colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        // paddingVertical: 20,
        paddingHorizontal: 10,
        paddingBottom: 20
    },
    closeOptionContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    option:{
        flexDirection: 'row',
        padding: 10
    },
    optionImage: {
        width: 25,
        height: 25,
        tintColor: 'gray'
    },
    optionText:{
        fontSize : 16,
        fontWeight: 'bold',
        fontFamily: Fonts.bold,
        color: Colors.gray,
        paddingLeft: 10     
    },
    seprater: {
        borderBottomWidth: 0.5,
        borderBottomColor:  Colors.gray,
        width: '100%'
    }
})

export default BottomOptionModal