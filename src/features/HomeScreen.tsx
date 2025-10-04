import { DrawerActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { yourAction } from '../redux/rootReducers/yourReducer'

const HomeScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerSection}>
        <Image
          source={{
            uri: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
          }}
          style={styles.heroImage}
        />
        <Text style={styles.title}>Welcome to React Native Playground</Text>
        <Text style={styles.subtitle}>
          Discover, play, and learn beautiful React Native animations!
        </Text>
      </View>
      <View style={styles.cardSection}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✨ Smooth Transitions</Text>
          <Text style={styles.cardDesc}>
            Experience seamless and interactive UI transitions.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎬 Animation Demos</Text>
          <Text style={styles.cardDesc}>
            Try out fade, move, and combined animations in real time.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📚 Learn by Example</Text>
          <Text style={styles.cardDesc}>
            Explore code samples and best practices for animation.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={() => {
          dispatch(
            yourAction({
              data: 'Sample Redux',
            }),
          )
          navigation.dispatch(DrawerActions.openDrawer())
        }}>
        <Text style={styles.ctaText}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  contentContainer: {
    padding: 24,
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 18,
    backgroundColor: '#e0e7ef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4f8cff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSection: {
    width: '100%',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#273F4F',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 15,
    color: '#6b7a8f',
  },
  ctaButton: {
    backgroundColor: '#4f8cff',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#4f8cff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 2,
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
})

export default HomeScreen
