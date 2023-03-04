import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { bell, leftArrow } from '../Helper/Images'

const AppHeader = ({
    isBack,
    onPressBack,
    showProfile,
    showTitle,
    title,
    showRightBtn,
    rightBtnImage,
    onPressRightBtn
}) => {
    return (
        <View style={styles.mainContainer}>
            {
                isBack && (
                    <TouchableOpacity onPress={onPressBack} style={styles.profileContainer}>
                        <Image
                            style={styles.backBtnImage}
                            source={leftArrow}
                        />
                    </TouchableOpacity>
                )
            }
            {
                showProfile && (
                    <View style={styles.profileContainer}>
                        <Image
                            style={styles.profileImage}
                            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600' }}
                        />
                    </View>
                )
            }

            <View style={styles.titleContaner}>
                {
                    showTitle && (
                        <Text style={styles.titleText}>{title}</Text>
                    )
                }
            </View>
            
            {
                showRightBtn && (
                    <TouchableOpacity onPress={onPressRightBtn} style={styles.rightBtnContainer}>
                        <Image
                            style={styles.rightBtnImage}
                            source={rightBtnImage}
                        />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

AppHeader.defaultProps = {
    isBack: false,
    showProfile: false,
    showTitle: false,
    onPressBack: () => { },
    title: '',
    showRightBtn: false,
    rightBtnImage: bell,
    onPressRightBtn: () => {}
}

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        // borderWidth:1
    },
    titleContaner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
        // borderWidth:1
    },
    profileContainer: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightBtnContainer: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'gray'
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    rightBtnImage: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    backBtnImage: {
        width: 25,
        height: 25
    }
})

export default AppHeader