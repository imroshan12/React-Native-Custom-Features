/**
 * AutoSlidingFlatListBanner
 *
 * A horizontally auto-sliding FlatList banner with infinite looping and pagination dots.
 * - Supports auto-scroll with seamless looping.
 * - Handles user touch to pause/resume auto-scroll.
 * - Pagination dots indicate the current banner.
 *
 * Usage: <AutoSlidingFlatListBanner />
 */
import React, { useRef, useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  GestureResponderEvent,
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

// Helper: Add clones for infinite loop
// The data will be [last_item, ...original_data, first_item]
const getLoopedData = () => {
  if (bannerData.length === 0) {
    return []
  }
  const first = bannerData[0]
  const last = bannerData[bannerData.length - 1]
  return [last, ...bannerData, first]
}

const BANNER_AUTO_SCROLL_INTERVAL = 3000
const SCROLL_ANIMATION_DURATION = 350 // Milliseconds, roughly corresponds to `animated: true` duration

const CarouselScreen = () => {
  const flatListRef = useRef<FlatList<any>>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const currentPositionRef = useRef<number | null>(null) // Track the current position in loopedData
  const userMovedRef = useRef(false) // Flag to track if user has recently scrolled
  const [activeIndex, setActiveIndex] = useState(0) // This should always represent the index in original bannerData
  const loopedData = getLoopedData()
  // ITEM_WIDTH: (width of item: 0.95 * SCREEN_WIDTH) + (left margin: 8) + (right margin: 8) = SCREEN_WIDTH * 0.95 + 16
  const ITEM_WIDTH = SCREEN_WIDTH * 0.95 + 16
  const userInteractedRef = useRef(false) // Flag to track if user has recently scrolled

  // On mount, scroll to the first real item (index 1 of loopedData)
  useEffect(() => {
    // A small timeout ensures the FlatList is rendered before attempting to scroll
    setTimeout(() => {
      if (flatListRef.current) {
        // Scroll to index 1, which is the first actual item in the looped data.
        flatListRef.current.scrollToIndex({ index: 1, animated: false })
        setActiveIndex(0) // Initialize pagination to the first actual item
      }
    }, 100) // Give it a bit more time
  }, [])

  const clearAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const scrollToNext = useCallback(() => {
    if (flatListRef.current) {
      let nextRealItemIndex = (activeIndex + 1) % bannerData.length
      let nextLoopedIndex = nextRealItemIndex + 1
      if (nextRealItemIndex === 0 && activeIndex === bannerData.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: loopedData.length - 1,
          animated: true,
        })
        setTimeout(() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
              index: 1,
              animated: false,
            })
            setActiveIndex(0)
          }
        }, SCROLL_ANIMATION_DURATION)
      } else {
        flatListRef.current?.scrollToIndex({
          index: nextLoopedIndex,
          animated: true,
        })
        setActiveIndex(nextRealItemIndex)
      }
    }
  }, [activeIndex, loopedData.length])

  const scrollToPrevious = useCallback(() => {
    if (flatListRef.current) {
      let prevRealItemIndex =
        (activeIndex - 1 + bannerData.length) % bannerData.length
      let prevLoopedIndex = prevRealItemIndex + 1
      if (prevRealItemIndex === bannerData.length - 1 && activeIndex === 0) {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        })
        setTimeout(() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
              index: bannerData.length,
              animated: false,
            })
            setActiveIndex(bannerData.length - 1)
          }
        }, SCROLL_ANIMATION_DURATION)
      } else {
        flatListRef.current?.scrollToIndex({
          index: prevLoopedIndex,
          animated: true,
        })
        setActiveIndex(prevRealItemIndex)
      }
    }
  }, [activeIndex])

  const startAutoScroll = useCallback(() => {
    clearAutoScroll()
    intervalRef.current = setInterval(() => {
      if (flatListRef.current && !userInteractedRef.current) {
        scrollToNext()
      }
    }, BANNER_AUTO_SCROLL_INTERVAL)
  }, [clearAutoScroll, scrollToNext])

  // Effect for auto-scrolling
  useEffect(() => {
    startAutoScroll()
    return clearAutoScroll // Cleanup on unmount
  }, [startAutoScroll, clearAutoScroll])

  // Render function for each banner item
  const renderItem = useCallback(
    ({
      item,
    }: {
      item: {
        text: string
        backgroundColor: string
        id: string
        icon: string
      }
    }) => (
      <View
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
    ),
    [],
  )

  return (
    <View style={styles.container}>
      <View style={styles.flatListWrapper}>
        <FlatList
          ref={flatListRef}
          data={loopedData}
          renderItem={renderItem}
          keyExtractor={(_, idx) => idx.toString()}
          horizontal
          scrollEnabled={false} // Disable scrolling if user has interacted
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          snapToAlignment="start" // Ensure snapping to the start of the item
          decelerationRate="fast" // Ensures one-item snapping
          getItemLayout={(_, index) => ({
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          })}
          onScrollToIndexFailed={info => {
            // Fallback to scrollToOffset if scrollToIndex fails
            // This ensures smooth navigation even if an item is initially out of view range
            flatListRef.current?.scrollToOffset({
              offset: ITEM_WIDTH * info.index,
              animated: false,
            })
          }}
          onTouchStart={(event: GestureResponderEvent) => {
            userInteractedRef.current = true
            currentPositionRef.current = event.nativeEvent.pageX
          }}
          onTouchEnd={() => {
            userInteractedRef.current = false
            userMovedRef.current = false
            startAutoScroll()
          }}
          onTouchMove={(event: GestureResponderEvent) => {
            const deltaX =
              event.nativeEvent.pageX - (currentPositionRef.current || 0)
            if (deltaX < -50 && userMovedRef.current === false) {
              userInteractedRef.current = true
              userMovedRef.current = true
              scrollToNext()
            } else if (deltaX > 50 && userMovedRef.current === false) {
              userInteractedRef.current = true
              userMovedRef.current = true
              scrollToPrevious()
            }
          }}
        />
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

export default CarouselScreen

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
