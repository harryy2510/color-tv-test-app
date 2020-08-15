import { Icon, Input, ListItem, Text, Avatar, Divider } from '@ui-kitten/components'
import { RenderProp } from '@ui-kitten/components/devsupport'
import React from 'react'
import {
    ImageProps,
    ScrollView,
    StyleSheet,
    View,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useDidMountEffect from '@harryy/rehooks/useDidMountEffect'
import { useDispatch, useSelector } from 'react-redux'
import { searchUsers, selectUser } from '../actions/user.actions'
import { RootState, RouteComponentProps, User, UserState } from '../types'
import { getAvatarSource } from '../utils'

const styles = StyleSheet.create({
    flexFill: {
        flex: 1,
        backgroundColor: '#fff'
    },
    inputContainer: {
        marginVertical: 32,
        paddingHorizontal: 32
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 64
    },
    spacer: {
        marginVertical: 8
    }
})

const ItemImage: RenderProp<Partial<ImageProps>> = (props) => (
    <Avatar {...props} style={[props?.style, { tintColor: undefined }]} />
)

const renderSearchIcon: RenderProp<Partial<ImageProps>> = (props) => (
    <Icon {...props} name="search" />
)

const Search: React.FC<RouteComponentProps<'Search'>> = ({ navigation }) => {
    const userState = useSelector<RootState>((state) => state.user) as UserState
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = React.useState('')

    useDidMountEffect(() => {
        dispatch(searchUsers(searchTerm))
    }, [searchTerm])

    const handleClick = async (user: User) => {
        await dispatch(selectUser(user))
        navigation.navigate('Profile')
    }

    return (
        <SafeAreaView style={styles.flexFill}>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={styles.flexFill}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.flexFill}>
                        <View style={styles.inputContainer}>
                            <Input
                                clearButtonMode="while-editing"
                                value={searchTerm}
                                placeholder="Search"
                                accessoryLeft={renderSearchIcon}
                                onChangeText={setSearchTerm}
                            />
                        </View>
                        {Boolean(searchTerm) ? (
                            userState?.loading ? (
                                <ActivityIndicator />
                            ) : userState?.items?.length! > 0 ? (
                                <ScrollView>
                                    {userState.items.map((user) => (
                                        <React.Fragment key={user.id}>
                                            <ListItem
                                                onPress={() => handleClick(user)}
                                                title={`${user.first_name || ''} ${
                                                    user.last_name || ''
                                                }`}
                                                description={user.username}
                                                accessoryLeft={(props) => (
                                                    <ItemImage
                                                        {...props}
                                                        source={getAvatarSource(
                                                            user.profile_image?.medium
                                                        )}
                                                    />
                                                )}
                                            />
                                            <Divider />
                                        </React.Fragment>
                                    ))}
                                </ScrollView>
                            ) : (
                                <View style={[styles.flexFill, styles.emptyContainer]}>
                                    <Image
                                        source={require('../../assets/search/empty-state-no-result.jpg')}
                                    />
                                    <View style={styles.spacer} />
                                    <Text category="h5">No results</Text>
                                    <View style={styles.spacer} />
                                    <Text category="c1">
                                        Sorry, There are no results for this search.
                                    </Text>
                                </View>
                            )
                        ) : (
                            <View style={[styles.flexFill, styles.emptyContainer]}>
                                <Image
                                    source={require('../../assets/search/empty-state-search.jpg')}
                                />
                                <View style={styles.spacer} />
                                <Text category="h5">Search for people</Text>
                                <View style={styles.spacer} />
                                <Text category="c1">
                                    You can search people by their name or email address
                                </Text>
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Search
