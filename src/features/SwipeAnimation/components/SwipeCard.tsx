import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  UIManager,
  View,
} from 'react-native'

export interface SwipeCardProps {
  data: any[]
  renderCard: (item: any) => any
  onSwipeLeft: (item: any) => any
  onSwipeRight: (item: any) => any
  renderNoMoreCard?: () => any
}

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.5 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

const SwipeCard = (props: SwipeCardProps) => {
  const {
    data,
    renderCard,
    onSwipeLeft = () => {},
    onSwipeRight = () => {},
    renderNoMoreCard,
  } = props
  const [itemIndex, setItemIndex] = useState(0)
  const [cardHidden, setCardHidden] = useState(false) // to avoid flicker
  const position = useRef(new Animated.ValueXY()).current

  //   const nextCardOpacity = useRef(new Animated.Value(0)).current
  //   const nextCardScale = useRef(new Animated.Value(0.9)).current

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove(e, gestureState) {
        // Handle the movement
        console.log(gestureState)
        position.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        })
      },
      onPanResponderRelease(e, gestureState) {
        // Handle the release
        if (gestureState.dx > SWIPE_THRESHOLD) {
          console.log('Swipe right')
          forceSwipe('right')
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          console.log('Swipe left')
          forceSwipe('left')
        } else {
          resetPosition()
        }
      },
    }),
  ).current

  //   useEffect(() => {
  //     nextCardOpacity.setValue(0)
  //     nextCardScale.setValue(0.9)

  //     Animated.parallel([
  //       Animated.timing(nextCardOpacity, {
  //         toValue: 1,
  //         duration: 300,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(nextCardScale, {
  //         toValue: 1,
  //         duration: 300,
  //         useNativeDriver: true,
  //       }),
  //     ]).start()
  //   }, [itemIndex, nextCardOpacity, nextCardScale])

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true)
    LayoutAnimation.spring()
  })

  useEffect(() => {
    setItemIndex(0)
  }, [data])

  const forceSwipe = (direction: 'left' | 'right') => {
    const x = direction === 'right' ? 2 * SCREEN_WIDTH : -2 * SCREEN_WIDTH
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction))
  }

  const onSwipeComplete = (direction: 'left' | 'right') => {
    const item = data[itemIndex]

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)

    setCardHidden(true)

    setTimeout(() => {
      position.setValue({ x: 0, y: 0 })
      setItemIndex(prev => prev + 1)
      setCardHidden(false) // to avoid flicker
    })
  }

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false, // true if you want to use transform
    }).start()
  }

  const getAnimatedCardStyle = useCallback(() => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['-45deg', '0deg', '45deg'],
    })
    const opacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: [0.1, 1, 0.1],
      extrapolate: 'clamp',
    })
    return {
      ...position.getLayout(),
      transform: [
        // { translateX: position.x }, // if you want to use nativeDriver=true
        // { translateY: position.y },
        { rotate },
      ],
      opacity,
    }
  }, [position])

  const renderCards = () => {
    if (itemIndex >= data.length) {
      return renderNoMoreCard?.()
    }
    return data.map((item, index) => {
      if (index < itemIndex) {
        return null
      }
      if (index === itemIndex) {
        return !cardHidden ? (
          <Animated.View
            style={[
              getAnimatedCardStyle(),
              styles.carStyle,
              { zIndex: -index },
            ]}
            {...panResponder.panHandlers}
            key={item.id}>
            {renderCard(item)}
          </Animated.View>
        ) : null
      }
      //   if (index === itemIndex + 1) {
      //     const animatedStyle = {
      //       opacity: nextCardOpacity,
      //       transform: [{ scale: nextCardScale }],
      //       top: 10 * (index - itemIndex),
      //       width: SCREEN_WIDTH - 5 * (index - itemIndex),
      //       left: 1.5 * (index - itemIndex),
      //       zIndex: -index,
      //       position: 'absolute',
      //     }
      //     return (
      //       <Animated.View
      //         key={item.id}
      //         style={{
      //           opacity: nextCardOpacity,
      //           transform: [{ scale: nextCardScale }],
      //           top: 10 * (index - itemIndex),
      //           width: SCREEN_WIDTH - 5 * (index - itemIndex),
      //           left: 1.5 * (index - itemIndex),
      //           zIndex: -index,
      //           position: 'absolute',
      //         }}>
      //         {renderCard(item)}
      //       </Animated.View>
      //     )
      //   }
      return (
        <Animated.View
          style={[
            styles.carStyle,
            {
              top: 10 * (index - itemIndex),
              width: SCREEN_WIDTH - 5 * (index - itemIndex),
              left: 1.5 * (index - itemIndex),
              zIndex: -index,
            },
          ]}
          key={item.id}>
          {renderCard(item)}
        </Animated.View>
      )
    })
    //   .reverse()
  }
  return <View>{renderCards()}</View>
}

const styles = StyleSheet.create({
  carStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    // left: 0,
    // right: 0,
  },
})

export default SwipeCard
