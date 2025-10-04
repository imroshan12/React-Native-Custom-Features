import React from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Button,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const FadeView = ({
  children,
  fadeAnimation,
}: {
  children: React.ReactNode
  fadeAnimation: number
}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (fadeAnimation === 0) {
      return
    }
    Animated.timing(fadeAnim, {
      toValue: fadeAnimation % 2 ? 0 : 1,
      duration: 2000,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim, fadeAnimation])

  return (
    <Animated.View
      style={{
        ...styles.fadeInContainer,
        opacity: fadeAnim,
      }}>
      {children}
    </Animated.View>
  )
}

const MoveView = ({
  moveAnimation,
  children,
}: {
  children: React.ReactNode
  moveAnimation: number
}) => {
  const moveAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (moveAnimation === 0) {
      return
    }
    // Start the move animation
    Animated.timing(moveAnim, {
      toValue: moveAnimation % 2 ? 100 : 0,
      duration: 2000,
      // speed: 1,
      // bounciness: 0,
      useNativeDriver: true,
    }).start()
  }, [moveAnim, moveAnimation])

  return (
    <Animated.View
      style={{
        ...styles.moveContainer,
        transform: [{ translateY: moveAnim }],
      }}>
      {children}
    </Animated.View>
  )
}

const CombinedAnimationView = () => {
  const boxOpacity = useRef(new Animated.Value(0)).current
  const boxTranslation = useRef(new Animated.Value(0)).current
  const staggerValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current

  const animate = () => {
    boxOpacity.setValue(0)
    boxTranslation.setValue(0)
    staggerValues.forEach(val => val.setValue(0))

    Animated.sequence([
      Animated.timing(boxOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(boxTranslation, {
        toValue: 100,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start(() => console.log('Sequence animation finished!'))

    // Animated.parallel([
    //   Animated.timing(boxOpacity, {
    //     toValue: 1,
    //     duration: 2000,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(boxTranslation, {
    //     toValue: 100,
    //     duration: 2000,
    //     useNativeDriver: true,
    //   }),
    // ]).start(() => console.log('Parallel animation finished!'))

    Animated.stagger(
      100,
      staggerValues.map(value =>
        Animated.spring(value, {
          toValue: 1,
          speed: 1,
          bounciness: 0,
          useNativeDriver: true,
        }),
      ),
    ).start(() => console.log('Stagger animation finished!'))
  }
  return (
    <View style={styles.combinedViewContainer}>
      <View style={styles.exampleSection}>
        <Text style={styles.sectionTitle}>Sequence & Parallel Example</Text>
        <Animated.View
          style={[
            styles.animatedBox,
            {
              opacity: boxOpacity,
              transform: [{ translateX: boxTranslation }],
            },
          ]}
        />
        <Button title="Run Sequence/Parallel" onPress={animate} />
      </View>

      <View style={styles.exampleSection}>
        <Text style={styles.sectionTitle}>Stagger Example</Text>
        <View style={styles.staggerContainer}>
          {staggerValues.map((val, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.staggerItem,
                {
                  opacity: val,
                  transform: [
                    {
                      translateY: val.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
              ]}>
              Item {index + 1}
            </Animated.Text>
          ))}
        </View>
        <Button title="Run Stagger" onPress={animate} />
      </View>
    </View>
  )
}

const AnimationsScreen = () => {
  const [fadeAnimation, setFadeAnimation] = useState(0)
  const [moveAnimation, setMoveAnimation] = useState(0)
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.marginTop32}>
          <Text style={styles.title}>Learning react animations</Text>
        </View>
        <View style={styles.centeredContent}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={() => {
                console.log('LOGGERS animate button pressed')
                setFadeAnimation(prev => prev + 1)
              }}
              style={styles.animateButton}>
              <Text>FADE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('LOGGERS move button pressed')
                setMoveAnimation(prev => prev + 1)
              }}
              style={styles.animateButton}>
              <Text>MOVE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('LOGGERS move button pressed')
                setMoveAnimation(prev => prev + 1)
              }}
              style={styles.animateButton}>
              <Text>COMBINE</Text>
            </TouchableOpacity>
          </View>
          <FadeView fadeAnimation={fadeAnimation}>
            <Text>Fade In Animation Example</Text>
          </FadeView>
          <MoveView moveAnimation={moveAnimation}>
            <Text>Move Animation Example</Text>
          </MoveView>
          <CombinedAnimationView />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBFFCB',
  },
  animateButton: {
    padding: 8,
    backgroundColor: '#6FE6FC',
    borderRadius: 8,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.2,
    borderColor: '#273F4F',
  },
  fadeInContainer: {
    alignItems: 'center',
    padding: 24,
    marginTop: 24,
    marginHorizontal: 24,
    borderRadius: 16,
    borderWidth: 0.2,
    borderColor: '#273F4F',
    backgroundColor: '#FFC6C6',
  },
  moveContainer: {
    alignItems: 'center',
    padding: 24,
    marginTop: 24,
    marginHorizontal: 24,
    borderRadius: 16,
    borderWidth: 0.2,
    borderColor: '#273F4F',
    backgroundColor: '#FFC6C6',
    zIndex: 2,
  },
  combinedViewContainer: {
    alignItems: 'center',
    padding: 24,
    paddingHorizontal: 16,
    marginTop: 24,
    marginHorizontal: 24,
    borderRadius: 16,
    borderWidth: 0.2,
    borderColor: '#273F4F',
    backgroundColor: '#FFFBDE',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  marginTop32: {
    marginTop: 32,
  },
  centeredContent: {
    flex: 1,
    marginTop: 32,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  exampleSection: {
    marginBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#34495e',
  },
  animatedBox: {
    width: 80,
    height: 80,
    backgroundColor: 'dodgerblue',
    borderRadius: 8,
    marginBottom: 20,
  },
  staggerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  staggerItem: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#e74c3c',
    color: '#fff',
    borderRadius: 5,
    marginHorizontal: 5,
  },
})

export default AnimationsScreen
