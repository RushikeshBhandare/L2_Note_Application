import { View, Text } from 'react-native'
import React from 'react'
import NotesScreen from './src/Screens/NotesScreen'
import AddNote from './src/Screens/AddNote'
import { NavigationContainer } from '@react-navigation/native'
import Route from './src/Routing/Route'

const App = () => {
  return (
    <NavigationContainer>
      <Route/>
    </NavigationContainer>
    // <HomeScreen/>
    // <AddNote/>
  )
}

export default App