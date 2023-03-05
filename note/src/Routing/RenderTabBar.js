import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Keyboard } from 'react-native'
import { search, home, notes, support, progress } from '../Helper/Images'
import Fonts from '../Helper/Fonts'
import Colors from '../Helper/Colors'

const RenderTabBar = (props) => {
    const {state, navigation } = props
    const [isKeyBoardVisible, setIsKeyBoardVisible] = useState(true)

    const tabArray = [
        {
          id: 0,
          icon: home,
          key: 'Home', 
          title: 'Home',
        //   color: Color.yellow
        },
        {
          id: 1,
          icon: notes,
          key: 'Notes',
          title: 'Notes',
        //   color: Color.yellow
        },
        {
          id: 2,
          icon: progress,
          key: 'Progress',
          title: 'Progress',
        //   color: Color.yello
        },
        {
          id: 3,
          icon: support,
          key: 'Support',
          title: 'Support',
        //   color: Color.yellow
        }
      ]
    
    useEffect(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setIsKeyBoardVisible(false)
      })
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setIsKeyBoardVisible(true)
      })
  
      return () => {
        showSubscription.remove()
        hideSubscription.remove()
      }
    }, [])
  

  return (
    <View>
      {
        isKeyBoardVisible &&
        <View style={styles.mainContainer}>
            {
                tabArray.map((item)=>{
                    const isFocused = state.index === item.id
                    const onPress = () => {
                        const event = navigation.emit({
                          type: 'tabPress',
                          target: item.key,
                          canPreventDefault: true,
                        });
                        
                        if (!isFocused && !event.defaultPrevented) {
                          navigation.navigate({ name: item.title, merge: true });
                        }
                      };
              
                    return (
                        <TouchableOpacity
                            key={item?.id}
                            accessibilityRole="button"
                            onPress={onPress}
                            style={styles.iconContainer}
                        >
                            <Image
                                source={item.icon}
                                style={[styles.iconImage, {tintColor: isFocused ? Colors.orenge : Colors.gray}]}
                            />
                            <Text style={[styles.lableText, { color: isFocused ? Colors.orenge : Colors.gray }]}>
                            {item.title}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: Colors.white,
        elevation: 20
    },
    iconContainer:{
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        marginTop: 10
        // height: 70
    },
    iconImage: {
        width: 25,
        height: 25
    },
    lableText: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5,
        fontFamily: Fonts.bold
    }
}) 

export default RenderTabBar