import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

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
        backgroundColor: 'white'
    }
})

export default AppContainer