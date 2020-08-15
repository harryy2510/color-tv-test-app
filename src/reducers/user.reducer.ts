import { AnyAction } from 'redux'
import { UserActionTypes } from '../actions/user.actions'
import { User, UserState } from '../types'

let initialState: UserState = {
    loading: false,
    loaded: false,
    ids: [],
    entities: {},
    items: [],
    selected: null,
    photos: {}
}

const reducer = (state = initialState, action: AnyAction): UserState => {
    switch (action.type) {
        case UserActionTypes.SEARCH:
            return { ...state, loading: true, entities: {}, ids: [] }
        case UserActionTypes.SEARCH_SUCCESS:
            const entities: Record<string, User> = {}
            const ids: string[] = []
            action.payload.forEach((user: User) => {
                ids.push(user.id)
                entities[user.id] = user
            })
            return { ...state, loading: false, loaded: true, ids, entities, items: action.payload }
        case UserActionTypes.SEARCH_ERROR:
            return { ...state, loading: false, loaded: false }
        case UserActionTypes.SELECT:
            const photos = { ...state.photos, [action.payload.id]: action.payload.photos }
            return { ...state, selected: action.payload.id, photos }
        default:
            return state
    }
}

export default reducer
