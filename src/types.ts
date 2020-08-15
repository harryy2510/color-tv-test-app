import React from 'react'
import reducers from './reducers'
import { RouteProp, ParamListBase, NavigationProp } from '@react-navigation/native'

export interface RouteComponentProps<RouteName extends keyof ParamListBase> {
    route: RouteProp<ParamListBase, RouteName>
    navigation: NavigationProp<ParamListBase>
}

export interface Route {
    component: React.ComponentType<RouteComponentProps<any>>
    name: string
}

export type RootState = ReturnType<typeof reducers>

export interface UserState {
    loading: boolean
    loaded: boolean
    selected: string | null
    ids: string[]
    entities: Record<string, User>
    items: User[]

    photos: Record<string, Photo[]>
}

export interface User {
    id: string
    updated_at: string
    username: string
    name: string
    first_name: string
    last_name: string
    twitter_username: string
    portfolio_url: string
    bio: string
    location: string
    links: Links
    profile_image: ProfileImage
    instagram_username: string
    total_collections: number
    total_likes: number
    total_photos: number
    accepted_tos: boolean
    followed_by_user: boolean
    photos: UserPhoto[]
}

export interface Links {
    self: string
    html: string
    photos: string
    likes: string
    portfolio: string
}

export interface UserPhoto {
    id: string
    created_at: string
    updated_at: string
    urls: Urls
}

export interface Urls {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
}

export interface ProfileImage {
    small: string
    medium: string
    large: string
}

export interface Photo {
    id: string
    created_at: string
    updated_at: string
    width: number
    height: number
    color: string
    likes: number
    liked_by_user: boolean
    description: string
    user: User
    current_user_collections: CurrentUserCollection[]
    urls: Urls
    links: PhotoLinks
}

export interface CurrentUserCollection {
    id: number
    title: string
    published_at: string
    last_collected_at: string
    updated_at: string
    cover_photo: string | null
    user: User | null
}

export interface PhotoLinks {
    self: string
    html: string
    download: string
    download_location: string
}
