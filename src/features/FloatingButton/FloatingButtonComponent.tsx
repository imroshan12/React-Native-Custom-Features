import React from 'react'
import { Alert, Dimensions, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const FloatingButtonComponent = () => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const startX = useSharedValue(0)
  const startY = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value
      startY.value = translateY.value
    }) // when the gesture starts
    .onUpdate(event => {
      translateX.value = startX.value + event.translationX
      translateY.value = startY.value + event.translationY
    }) // When the gesture is updated (moving)
    .onEnd(() => {
      if (translateX.value < 0) {
        translateX.value = 10
      } else if (translateX.value > screenWidth - 200) {
        translateX.value = screenWidth - 200
      }

      if (translateY.value < 0) {
        translateY.value = 10
      } else if (translateY.value > screenHeight - 200) {
        translateY.value = screenHeight - 200
      }
    })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }
  })
  const handlePress = () => {
    Alert.alert('Floating Button Pressed!')
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.root, animatedStyle]}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.text}>Floating Button</Text>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
  },
  button: {
    backgroundColor: '#FFF7DD',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9B5DE0',
  },
  text: {
    letterSpacing: 0.5,
    fontWeight: 'bold',
    fontSize: 20,
  },
})
