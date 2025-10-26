import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Text, View, StyleSheet } from 'react-native'
import ProfileScreen from '../features/ProfileScreen'
import HomeScreen from '../features/HomeScreen'
import {
  useNavigation,
  DrawerActions,
  useNavigationState,
} from '@react-navigation/native'
import { FlatList, TouchableOpacity } from 'react-native'
import CarouselScreen from '../features/CarouselScreen'
import AnimationsScreen from '../features/AnimationsScreen'
import BottomSheetScreen from '../features/BottomSheets/BottomSheetScreen'
import SwipeAnimation from '../features/SwipeAnimation'
import { FloatingButton } from '../features/FloatingButton'
import { PinchAnimation } from '../features/PinchAnimation'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const drawerItems = [
  { key: 'Home', label: 'Home', screen: 'Home' },
  // { key: 'Profile', label: 'Profile', screen: 'ProfileScreen' },
  { key: 'Carausel', label: 'Carousel', screen: 'CarouselScreen' },
  { key: 'Animations', label: 'Animations', screen: 'AnimationsScreen' },
  { key: 'BottomSheets', label: 'Bottom Sheets', screen: 'BottomSheetsScreen' },
  { key: 'SwipeAnimation', label: 'Swipe Animation', screen: 'SwipeAnimation' },
  { key: 'FloatingButton', label: 'Floating Button', screen: 'FloatingButton' },
  { key: 'PinchAnimation', label: 'Pinch Animation', screen: 'PinchAnimation' },
]

const CustomDrawerContent = () => {
  const navigation = useNavigation()
  // Get the current route name from navigation state
  const state = useNavigationState(state => state)
  let currentRoute = 'Home'
  if (state && state.routes && state.routes.length > 0) {
    const drawerRoute = state.routes[state.index]
    // Check for nested stack navigation
    if (
      drawerRoute.state &&
      drawerRoute.state.index !== undefined &&
      drawerRoute.state.routes
    ) {
      const stackRoute = drawerRoute.state.routes[drawerRoute.state.index]
      currentRoute = stackRoute.name || 'Home'
    } else if (drawerRoute.name === 'DrawerNavigator') {
      // If DrawerNavigator is focused but no nested state, default to Home
      currentRoute = 'Home'
    } else {
      currentRoute = drawerRoute.name
    }
  }

  const handlePress = (item: (typeof drawerItems)[0]) => {
    navigation.navigate(item.screen as never)
    navigation.dispatch(DrawerActions.closeDrawer())
  }

  const renderItem = ({ item }: { item: (typeof drawerItems)[0] }) => (
    <TouchableOpacity
      style={[
        styles.drawerItem,
        currentRoute === item.screen && styles.drawerItemSelected,
      ]}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}>
      <Text
        style={[
          styles.drawerItemText,
          currentRoute === item.screen && styles.drawerItemTextSelected,
        ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerTitle}>Menu</Text>
      <FlatList
        data={drawerItems}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.drawerList}
      />
    </View>
  )
}

const HomeStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="CarouselScreen" component={CarouselScreen} />
    <Stack.Screen name="AnimationsScreen" component={AnimationsScreen} />
    <Stack.Screen name="BottomSheetsScreen" component={BottomSheetScreen} />
    <Stack.Screen name="SwipeAnimation" component={SwipeAnimation} />
    <Stack.Screen name="FloatingButton" component={FloatingButton} />
    <Stack.Screen name="PinchAnimation" component={PinchAnimation} />
  </Stack.Navigator>
)

const NavigationStack = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
      drawerType: 'slide',
    }}
    drawerContent={CustomDrawerContent}>
    <Drawer.Screen name="DrawerNavigator" component={HomeStackNavigator} />
  </Drawer.Navigator>
)

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
    color: '#333',
  },
  drawerList: {
    paddingHorizontal: 20,
  },
  drawerItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemSelected: {
    backgroundColor: '#4f8cff',
  },
  drawerItemText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  drawerItemTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default NavigationStack
