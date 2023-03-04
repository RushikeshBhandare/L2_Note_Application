import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AppHeader from '../Components/AppHeader'
import { more, search } from '../Helper/Images'
import AppContainer from '../Components/AppContainer'

const NotesScreen = (props) => {
    const { navigation } = props
    const [searchText, setSearchText] = useState('')
    const renderSearch = () =>{
        return(
            <View style={styles.searchInputContainer}>
                <Image
                    source={search}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder='Search'
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
        )
    }

    const onPressOption = () => {
    }
    
    const onPressItem = () => {
        navigation?.push('createNote')

         console.log('hi');
    }

    const listItem = ({item, index}) => {
        const showImg = item === 22
        return(
            <TouchableOpacity 
                style={styles.listItemContainer}
                onPress={onPressItem}
            >
                {
                    showImg && (
                        <View>
                            <Image
                                source={{uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'}}
                                style={styles.itemImage}
                            />
                        </View>
                    )
                }

               <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Title</Text>
                    <Text style={styles.descriptionText}>description</Text>
               </View>

               <TouchableOpacity
                onPress={onPressOption}
               >
                      <Image
                    source={more}
                    style={styles.moreOptionImage}
                />
               </TouchableOpacity>
            </TouchableOpacity>
        )
    }


    const renderNotesList = () => {
        return (
            <View style={styles.listContainer}>
                <FlatList
                    data={[2,2,2,2,2,22,2,2,2,22,2,2,2,22,2,2,2,2,2,]}
                    renderItem={listItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={({item, index})=> `${item?.id} ${index}` }
                />               
            </View>
        )
    }

  return (
    <AppContainer>
        <AppHeader 
            showProfile={true}
            title={'Note'}
            showTitle={true}
            showRightBtn={true}    
        />
        {renderSearch()}
        {renderNotesList()}
    </AppContainer>
    )
}

const styles = StyleSheet.create({
   mainContainer: {
    flex: 1
   },
   searchInputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'blue',
    borderBottomWidth: 1
   },
   searchIcon:{
    width: 20,
    height: 20
   },
   inputText: {
    fontSize: 16
   },
   listContainer:{
    flex:1
   },
   listItemContainer: {
    // borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'white',
    marginHorizontal: 5
   },
   textContainer: {
    flex: 1,
    paddingHorizontal: 10
   },
   itemImage: {
    width: 40,
    height: 40,
    borderRadius :10,

   },
   titleText:{
    fontWeight: 'bold',
    fontSize: 16
   },
   descriptionText:{
    fontSize: 14
   },
   moreOptionImage:{
    width: 20,
    height: 20,
    tintColor: 'gray'
   }
})

export default NotesScreen