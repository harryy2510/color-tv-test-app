import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import configureStore from './store/configureStore'
import routes from './routes'
import { Provider } from 'react-redux'

const store = configureStore()

const { Navigator, Screen } = createStackNavigator()

const Main: React.FC = () => {
    return (
        <Provider store={store}>
            <Navigator headerMode="none">
                {routes.map((route) => (
                    <Screen key={route.name} name={route.name} component={route.component} />
                ))}
            </Navigator>
        </Provider>
    )
}

export default Main
