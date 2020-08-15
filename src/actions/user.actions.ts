import debounce from 'lodash-es/debounce'
import { Dispatch } from 'redux'
import { Photo, User } from '../types'
import { getApiUrl } from '../utils'

export enum UserActionTypes {
    SEARCH = '[User] Search',
    SEARCH_SUCCESS = '[User] Search success',
    SEARCH_ERROR = '[User] Search error',

    SELECT = '[User] Select'
}

const debouncedSearched = debounce(async (searchTerm: string, dispatch: Dispatch) => {
    const res = await fetch(getApiUrl('search/users', searchTerm)).then((res) => res.json())
    const users: User[] = res.results
    dispatch({
        type: UserActionTypes.SEARCH_SUCCESS,
        payload: users
    })
}, 300)

export const searchUsers = (searchTerm: string) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: UserActionTypes.SEARCH
        })
        if (!searchTerm) {
            dispatch({
                type: UserActionTypes.SEARCH_SUCCESS,
                payload: []
            })
            return
        }
        await debouncedSearched(searchTerm, dispatch)
    }
}

export const selectUser = (user: User) => {
    return async (dispatch: Dispatch) => {
        const photos: Photo[] = await fetch(
            getApiUrl(`users/${user.username}/photos`)
        ).then((res) => res.json())
        dispatch({
            type: UserActionTypes.SELECT,
            payload: { id: user.id, photos }
        })
    }
}
