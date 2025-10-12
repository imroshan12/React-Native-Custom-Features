import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FloatingButtonComponent } from './FloatingButtonComponent'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../../components/Header'

export const FloatingButton = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Header />
      <View>
        <FloatingButtonComponent />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FDCFFA',
  },
})
