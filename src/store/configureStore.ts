import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'

const middleware =
    process.env.NODE_ENV !== 'production' ? [reduxImmutableStateInvariant(), thunk] : [thunk]

const configureStore = () => {
    return createStore(reducers, applyMiddleware(...middleware))
}

export default configureStore
