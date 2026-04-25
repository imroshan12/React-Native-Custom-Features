// In App.js in a new project

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import store from './redux/store'
import NavigationStack, { linking } from './navigation/NavigationStack'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native'

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <NavigationContainer
          linking={linking}
          fallback={
            <View style={{ flex: 1, backgroundColor: 'yellow' }}>
              <ActivityIndicator />
            </View>
          }>
          <NavigationStack />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  )
}
