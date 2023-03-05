import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, ActivityIndicator, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppHeader from '../Components/AppHeader'
import { more, plus, search } from '../Helper/Images'
import AppContainer from '../Components/AppContainer'
import { useDispatch, useSelector } from 'react-redux'
import BottomOptionModal from '../Components/BottomOptionModal'
import { deleteNote, getDataFromStorage, getNotes } from '../Store/Actions/NoteActions'
import Fonts from '../Helper/Fonts'
import Colors from '../Helper/Colors'

const NotesScreen = (props) => {
    const { navigation } = props
    const [searchText, setSearchText] = useState('')
    const [notes, setNotes] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [noPostYet, setNoPostYet] = useState(false)
    const dispatch = useDispatch()
    const ReduxNotes = useSelector((store) => store?.NoteReducer?.notes)

    useEffect(() => {
        getNotes(dispatch).then(() => {
            setIsLoading(false)
        }).catch(() => {
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        if (ReduxNotes) {
            if (ReduxNotes?.length > 0) {
                setNotes(ReduxNotes)
                setNoPostYet(false)
            } else {
                setNoPostYet(true)
            }
        }
    }, [ReduxNotes])

    const onChnageSerchTest = (value) => {
        setSearchText(value)
        console.log("value ", value)
        if (value !== '') {
            const res = ReduxNotes.filter((r) => r?.title && r?.title?.toLowerCase()?.includes(value?.toLowerCase()) || r?.desc?.toLowerCase()?.includes(value?.toLowerCase()))
            setNotes(res)
        }
        else {
            setNotes(ReduxNotes)
        }
    }

    const renderSearch = () => {
        return (
            <View style={styles.searchInputContainer}>
                <Image
                    source={search}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder='Search'
                    value={searchText}
                    onChangeText={onChnageSerchTest}
                />
            </View>
        )
    }

    const onPressOption = (item) => {
        setSelectedItem(item)
        setShowModal(true)
    }

    const onPressItem = (item) => {
        navigation?.push('createNote', {
            data: {
                isEdit: true,
                ...item
            }
        })
    }

    const listItem = ({ item, index }) => {
        const showImg = item?.imageData !== ''
        const title = item?.title
        return (
            <View
                style={styles.listItemContainer}
            >
                <TouchableOpacity
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => onPressItem(item)}
                >

                    {
                        showImg && (
                            <View>
                                <Image
                                    source={{ uri: item?.imageData }}
                                    style={styles.itemImage}
                                />
                            </View>
                        )
                    }

                    <View style={styles.textContainer}>
                        <Text numberOfLines={1} style={styles.titleText}>{title}</Text>
                        <Text numberOfLines={1} style={styles.descriptionText}>{item?.desc}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionBtnContainer}
                    onPress={() => onPressOption(item)}
                >
                    <Image
                        source={more}
                        style={styles.moreOptionImage}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const renderNotesList = () => {
        return (
            <View style={styles.listContainer}>
                <FlatList
                    data={notes}
                    renderItem={listItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => `${item?.id}`}
                />
            </View>
        )
    }

    const onPressAdd = () => {
        navigation?.push('createNote')
    }

    const onPressClose = () => {
        setShowModal(false)
    }

    const onPressShare = async () => {
        try {
            await Share.share({
                message: `${selectedItem?.title}\n\n${selectedItem?.desc}`,
            })
            setShowModal(false)
            setSelectedItem({})
        } catch (e) {
            console.log("error ", e);
        }
    }

    const onPressDelete = () => {
        deleteNote({ id: selectedItem?.id }, dispatch).then(() => {
        })
        setSelectedItem({})
        setShowModal(false)
    }

    const renderCreateFirstPost = () => {
        return (
            <View style={styles.newPostContainer}>
                <Text style={styles.newPostTitle}>no post yet</Text>
                <Text style={styles.newPostText}>Journaling can have many benifits for both
                    mental and physical health. it can be a helpful tool for managing strees, improving
                    self-awareness, and processing emothions.
                </Text>
                <TouchableOpacity onPress={onPressAdd} style={styles.addBtnforNewPost} >
                    <Image
                        source={plus}
                        style={styles.addbtnImage}
                    />
                </TouchableOpacity>
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
            {!noPostYet && renderSearch()}
            {isLoading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} color='red' />
                </View>
                : noPostYet ? renderCreateFirstPost()
                    : notes?.length > 0 &&
                    renderNotesList()
            }
            {
                !noPostYet && (
                    <TouchableOpacity onPress={onPressAdd} style={styles.addBtn} >
                        <Image
                            source={plus}
                            style={styles.addbtnImage}
                        />
                    </TouchableOpacity>
                )
            }
            <BottomOptionModal
                isVisible={showModal}
                onPressClose={onPressClose}
                onPressShare={onPressShare}
                onPressDelete={onPressDelete}
            />
        </AppContainer>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'blue',
        justifyContent: 'center',
        borderBottomWidth: 1
    },
    searchIcon: {
        width: 22,
        height: 22,
        tintColor: Colors.gray
    },
    inputText: {
        fontSize: 16,
        fontFamily: Fonts.regular,
        // borderWidth :1,
        flex :1
    },
    listContainer: {
        flex: 1
    },
    listItemContainer: {
        // borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: Colors.white,
        marginHorizontal: 5
    },
    textContainer: {
        flex: 1,
        padding: 5
    },
    itemImage: {
        width: 40,
        height: 40,
        borderRadius: 10,

    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.gray,
        fontFamily: Fonts.bold
        // padding:10
    },
    descriptionText: {
        fontSize: 14,
        color: Colors.gray,
        fontFamily: Fonts.regular
    },
    moreOptionImage: {
        width: 20,
        height: 20,
        tintColor: Colors.gray
    },
    addBtn: {
        width: 50,
        height: 50,
        backgroundColor: Colors.orenge,
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionBtnContainer: {
        alignItems: 'flex-end',
        width: '10%'
    },
    addbtnImage: {
        width: 20,
        height: 20,
        tintColor: Colors.white
    },
    newPostContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    newPostTitle: {
        fontWeight: 'bold',
        fontSize: 26,
        fontFamily: Fonts.bold,
        color: Colors.grayTitle
    },
    newPostText: {
        color: Colors.grayTitle,
        fontWeight: '400',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: Fonts.regular
    },
    addBtnforNewPost: {
        width: 50,
        height: 50,
        backgroundColor: Colors.orenge,
        marginTop: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default NotesScreen