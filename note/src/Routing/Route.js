import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NotesScreen from '../Screens/NotesScreen'
import AddNote from '../Screens/AddNote'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen'
import ProgressScreen from '../Screens/ProgressScreen'
import SupportScreen from '../Screens/SupportScreen'
import RenderTabBar from './RenderTabBar'

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator()

const RenderTabView = () => {
    return (
        <Tab.Navigator tabBar={RenderTabBar}  screenOptions={{ headerShown: false }} initialRouteName={'Notes'}>
            <Tab.Screen name='Home' component={HomeScreen}/>
            <Tab.Screen name='Notes' component={NotesScreen}/>
            <Tab.Screen name='Progress' component={ProgressScreen}/>
            <Tab.Screen name='Support' component={SupportScreen}/>
        </Tab.Navigator>
    )
} 

const Route = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={RenderTabView}/>
        <Stack.Screen name="createNote" component={AddNote}/>
    </Stack.Navigator>
  )
}

export default Route