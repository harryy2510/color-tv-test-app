import React from 'react'
import GallerySwiper from 'react-native-gallery-swiper'
import { useSelector } from 'react-redux'
import { RootState, RouteComponentProps, UserState } from '../types'

const Gallery: React.FC<RouteComponentProps<'Gallery'>> = ({ navigation, route }) => {
    const index = (route.params as any)?.index || 0
    const userState = useSelector<RootState>((state) => state.user) as UserState
    const photos = userState.photos[userState.selected!].map((photo) => ({
        uri: photo.urls.regular
    }))
    const navigateBack = () => {
        navigation.goBack()
    }
    return (
        <GallerySwiper
            onSwipeUpReleased={navigateBack}
            initialPage={index}
            onSwipeDownReleased={navigateBack}
            images={photos}
        />
    )
}

export default Gallery
