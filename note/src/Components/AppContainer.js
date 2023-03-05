import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../Helper/Colors'

const AppContainer = ({children}) => {
  return (
    <View style={styles.mainContainer}>
        {children}
    </View>
  )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: Colors.white
    }
})

export default AppContainer