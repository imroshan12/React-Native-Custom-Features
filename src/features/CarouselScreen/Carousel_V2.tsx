import React, { useRef, useEffect, useState } from 'react'
import {
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  Easing,
  PanResponder, // <-- Add PanResponder
} from 'react-native'

// Get screen width for consistent item sizing
const { width: SCREEN_WIDTH } = Dimensions.get('window')

// Data for the banner items
const bannerData = [
  {
    id: '1',
    text: 'Need funds? Up to 9 Lacs in 3 min!',
    backgroundColor: '#DBEAFE',
    icon: '💰',
  },
  {
    id: '2',
    text: 'Get 7% interest on your savings!',
    backgroundColor: '#DCFCE7',
    icon: '🏦',
  },
  {
    id: '3',
    text: 'Exclusive offers just for you!',
    backgroundColor: '#EDE9FE',
    icon: '🎁',
  },
  {
    id: '4',
    text: 'Refer a friend and earn rewards!',
    backgroundColor: '#FEF9C3',
    icon: '🤝',
  },
  {
    id: '5',
    text: 'Track your expenses easily!',
    backgroundColor: '#FECACA',
    icon: '📊',
  },
  {
    id: '6',
    text: '24/7 customer support available!',
    backgroundColor: '#C7D2FE',
    icon: '📞',
  },
  {
    id: '7',
    text: 'Instant loan approval!',
    backgroundColor: '#BBF7D0',
    icon: '⚡️',
  },
  {
    id: '8',
    text: 'Secure your account with OTP!',
    backgroundColor: '#FDE68A',
    icon: '🔒',
  },
  {
    id: '9',
    text: 'Scan & pay with QR code!',
    backgroundColor: '#FBCFE8',
    icon: '📱',
  },
  {
    id: '10',
    text: 'Personalized investment tips!',
    backgroundColor: '#A7F3D0',
    icon: '💡',
  },
]

const BANNER_AUTO_SCROLL_INTERVAL = 3000
const ANIMATION_DURATION = 400

// Main App component
const CarouselV2 = () => {
  const ITEM_WIDTH = SCREEN_WIDTH * 0.95 + 16
  const [currentIndex, setCurrentIndex] = useState(1) // index in loopedData
  const translateX = useRef(new Animated.Value(-ITEM_WIDTH)).current
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // For infinite loop, duplicate first and last
  const loopedData = [
    bannerData[bannerData.length - 1],
    ...bannerData,
    bannerData[0],
  ]

  // Animate to next/prev banner
  const animateToIndex = (toIndex: number, animated = true) => {
    setIsAnimating(true)
    Animated.timing(translateX, {
      toValue: -toIndex * ITEM_WIDTH,
      duration: animated ? ANIMATION_DURATION : 0,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      let nextIndex = toIndex
      if (toIndex === loopedData.length - 1) {
        // Jump to real first
        translateX.setValue(-ITEM_WIDTH)
        nextIndex = 1
      } else if (toIndex === 0) {
        // Jump to real last
        translateX.setValue(-ITEM_WIDTH * bannerData.length)
        nextIndex = bannerData.length
      }
      setCurrentIndex(nextIndex)
      setIsAnimating(false)
    })
  }

  // PanResponder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < 10
      },
      onPanResponderRelease: (_, gestureState) => {
        if (isAnimating) {
          return
        }
        if (gestureState.dx < -30) {
          // Swipe left (next)
          animateToIndex(currentIndex + 1, true)
        } else if (gestureState.dx > 30) {
          // Swipe right (prev)
          animateToIndex(currentIndex - 1, true)
        }
      },
    }),
  ).current

  // Auto-slide effect
  useEffect(() => {
    intervalRef.current && clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        animateToIndex(currentIndex + 1, true)
      }
    }, BANNER_AUTO_SCROLL_INTERVAL)
    return () => {
      intervalRef.current && clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating, currentIndex])

  // Render function for each banner item
  const renderItem = (item: (typeof bannerData)[0], idx: number) => (
    <View
      key={idx}
      style={[
        styles.bannerItemContainer,
        { backgroundColor: item.backgroundColor, width: SCREEN_WIDTH * 0.95 },
      ]}>
      <View style={styles.bannerContent}>
        {/* Icon for each banner */}
        <View style={styles.iconBackground}>
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        <Text style={styles.bannerText}>{item.text}</Text>
      </View>
      {/* Placeholder for the arrow icon */}
      <Text style={styles.arrowIcon}>→</Text>
    </View>
  )

  // activeIndex for dots: currentIndex - 1, but wrap around
  const activeIndex = (currentIndex - 1 + bannerData.length) % bannerData.length

  return (
    <View style={styles.container}>
      <View style={styles.flatListWrapper} {...panResponder.panHandlers}>
        <Animated.View
          style={{
            flexDirection: 'row',
            transform: [{ translateX }],
          }}>
          {loopedData.map((item, idx) => renderItem(item, idx))}
        </Animated.View>
      </View>

      {/* Pagination dots */}
      <View style={styles.paginationContainer}>
        {bannerData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index
                ? styles.activePaginationDot
                : styles.inactivePaginationDot,
            ]}
          />
        ))}
      </View>
    </View>
  )
}

export default CarouselV2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB', // bg-gray-50
    fontFamily: 'Inter', // Assuming Inter font is available or a system default will be used
  },
  flatListWrapper: {
    width: '100%',
    height: 96, // h-24 (24 * 4 = 96px)
  },
  bannerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16, // p-4 (4 * 4 = 16px)
    borderRadius: 8, // rounded-lg
    shadowColor: '#000', // shadow-md
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
    marginHorizontal: 8, // mx-2 (2 * 4 = 8px)
    height: 80, // h-20 (20 * 4 = 80px)
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBackground: {
    backgroundColor: '#3B82F6', // bg-blue-500
    padding: 8, // p-2
    borderRadius: 9999, // rounded-full
    marginRight: 12, // mr-3
  },
  iconText: {
    color: '#FFFFFF', // text-white
    fontSize: 18, // text-lg
    fontWeight: 'bold',
  },
  bannerText: {
    color: '#374151', // text-gray-800
    fontSize: 16, // text-base
    fontWeight: '600', // font-semibold
    flex: 1, // flex-1
  },
  arrowIcon: {
    color: '#4B5563', // text-gray-600
    fontSize: 20, // text-xl
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 16, // mt-4
  },
  paginationDot: {
    width: 8, // w-2
    height: 8, // h-2
    borderRadius: 4, // rounded-full
    marginHorizontal: 4, // mx-1
  },
  activePaginationDot: {
    backgroundColor: '#3B82F6', // bg-blue-500
  },
  inactivePaginationDot: {
    backgroundColor: '#D1D5DB', // bg-gray-300
  },
})
