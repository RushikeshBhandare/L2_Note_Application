import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import NotesScreen from './src/Screens/NotesScreen'
import AddNote from './src/Screens/AddNote'
import { NavigationContainer } from '@react-navigation/native'
import Route from './src/Routing/Route'
import { Provider } from 'react-redux'
import Store from './src/Store/Store'

const App = () => {
  useEffect(()=>{
    StatusBar.setBarStyle("dark-content", true);
    StatusBar.setBackgroundColor("#fff");
  }, [])
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Route/>
      </NavigationContainer>
    </Provider>
  )
}

export default App