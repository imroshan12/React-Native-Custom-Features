import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../../components/Header'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  //   runOnJS,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

export const PinchAnimation = () => {
  // Shared values for scale and pan
  const scale = useSharedValue(1)
  const savedScale = useSharedValue(1)

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const savedTranslateX = useSharedValue(0)
  const savedTranslateY = useSharedValue(0)

  // --- Pinch gesture ---
  const pinch = Gesture.Pinch()
    .onBegin(() => {
      savedScale.value = scale.value
    })
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale

      // Calculate focal adjustment to keep the zoom centered on the focal point
      const adjustedFocalX = e.focalX - 150
      const adjustedFocalY = e.focalY - 150

      translateX.value = savedTranslateX.value + adjustedFocalX * (1 - e.scale)
      translateY.value = savedTranslateY.value + adjustedFocalY * (1 - e.scale)
    })
    .onEnd(() => {
      // Clamp zoom out
      if (scale.value < 1) {
        scale.value = withTiming(1)
        translateX.value = withTiming(0)
        translateY.value = withTiming(0)
      }
      savedTranslateX.value = translateX.value
      savedTranslateY.value = translateY.value
    })

  // --- Pan gesture ---
  const pan = Gesture.Pan()
    .onBegin(() => {
      savedTranslateX.value = translateX.value
      savedTranslateY.value = translateY.value
    })
    .onUpdate(e => {
      translateX.value = savedTranslateX.value + e.translationX
      translateY.value = savedTranslateY.value + e.translationY
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value
      savedTranslateY.value = translateY.value
    })

  // Combine pinch + pan
  const gesture = Gesture.Simultaneous(pinch, pan)

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }))
  return (
    <SafeAreaView style={styles.root}>
      <Header />
      <View>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.canvas, animatedStyle]}>
            <Animated.View style={styles.child} />
          </Animated.View>
        </GestureDetector>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FDCFFA',
  },
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    width: 300,
    height: 300,
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  child: {
    width: 150,
    height: 150,
    backgroundColor: '#4caf50',
    borderRadius: 10,
  },
})
