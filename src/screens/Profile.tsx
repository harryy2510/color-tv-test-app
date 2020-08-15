import {
    Avatar,
    Divider,
    Icon,
    Text,
    TopNavigation,
    TopNavigationAction
} from '@ui-kitten/components'
import { RenderProp } from '@ui-kitten/components/devsupport'
import React from 'react'
import { ImageProps, ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState, RouteComponentProps, UserState } from '../types'
import { getAvatarSource } from '../utils'

const styles = StyleSheet.create({
    flexFill: {
        flex: 1,
        backgroundColor: '#fff'
    },
    avatarContainer: {
        marginTop: 16,
        marginBottom: 32,
        alignItems: 'center'
    },
    avatar: {
        width: 128,
        height: 128
    },
    name: {
        fontWeight: 'bold'
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 64
    },
    spacer: {
        marginVertical: 8
    },
    spacerHalf: {
        marginVertical: 2
    },
    imageContainer: {
        width: '44%',
        margin: '3%',
        shadowColor: '#777',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7
    },
    image: {
        height: 120,
        borderRadius: 4
    },
    content: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
})

const BackIcon: RenderProp<Partial<ImageProps>> = (props) => <Icon {...props} name="arrow-back" />

const Profile: React.FC<RouteComponentProps<'Profile'>> = ({ navigation }) => {
    const userState = useSelector<RootState>((state) => state.user) as UserState
    const user = userState.entities[userState.selected!]
    const photos = userState.photos[userState.selected!]
    const navigateBack = () => {
        navigation.goBack()
    }
    const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    return (
        <SafeAreaView style={styles.flexFill}>
            <TopNavigation title="Profile" alignment="center" accessoryLeft={BackAction} />
            <View style={styles.flexFill}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        style={styles.avatar}
                        source={getAvatarSource(user.profile_image?.large)}
                    />
                    <View style={styles.spacer} />
                    <Text category="h5" style={styles.name}>
                        {user.first_name} {user.last_name}
                    </Text>
                    <Text category="p1">{user.username}</Text>
                </View>
                <Divider />
                <View style={styles.spacerHalf} />
                <Divider />
                {photos.length > 0 ? (
                    <ScrollView contentContainerStyle={styles.content}>
                        {photos.map((photo, index) => (
                            <View key={photo.id} style={styles.imageContainer}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Gallery', { index })}
                                >
                                    <Image
                                        style={styles.image}
                                        source={{ uri: photo.urls.regular }}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <View style={[styles.flexFill, styles.emptyContainer]}>
                        <Image source={require('../../assets/profile/empty-state-no-photos.png')} />
                        <View style={styles.spacer} />
                        <Text category="h5">There are no images</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default Profile
