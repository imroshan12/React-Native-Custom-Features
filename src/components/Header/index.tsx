import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { DrawerActions, useNavigation } from '@react-navigation/native'

export const Header = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.header}>
      <Ionicons
        name="menu"
        size={30}
        color="white"
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer())
        }}
      />
      <Text style={styles.headerText}>Floating View Screen</Text>
      <Ionicons name="ellipsis-vertical-outline" size={30} color="white" />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    marginBottom: 10,
    backgroundColor: '#4E56C0',
    paddingHorizontal: 12,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})
