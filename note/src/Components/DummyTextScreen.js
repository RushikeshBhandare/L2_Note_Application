import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Fonts from '../Helper/Fonts'
import Colors from '../Helper/Colors'

const DummyTextScreen = ({title}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  )
}

DummyTextScreen.defaultProps = {
    title: ''
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 24,
        fontFamily: Fonts.bold,
        color: Colors.gray
    }
})

export default DummyTextScreen