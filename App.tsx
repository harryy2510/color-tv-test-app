import * as eva from '@eva-design/eva'
import { NavigationContainer } from '@react-navigation/native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Main from './src/Main'

const App: React.FC = () => {
    return (
        <SafeAreaProvider>
            <StatusBar style="dark" />
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                    <Main />
                </NavigationContainer>
            </ApplicationProvider>
        </SafeAreaProvider>
    )
}

export default App
