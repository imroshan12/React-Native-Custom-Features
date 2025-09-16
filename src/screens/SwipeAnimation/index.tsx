import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getSwipeAnimationStyles } from './swipeAnimationStyles'
import SwipeCard from './components/SwipeCard'
import { Text, TouchableOpacity, View } from 'react-native'
import { swipeData } from '../../../mocks/swipeMockData'
import Card from '../../components/Card'
import { Image } from 'react-native'

const SwipeAnimation = () => {
  const styles = getSwipeAnimationStyles()

  const renderCard = useCallback(
    (item: any) => {
      return (
        <Card style={styles.cardStyle}>
          <View style={styles.defaultVerticalPadding}>
            <Text style={styles.cardTitle}>{item.heading}</Text>
          </View>
          <View style={styles.imageContainer}>
            {item?.uri && (
              <Image
                source={{
                  uri: item.uri,
                }}
                style={styles.imageStyle}
              />
            )}
          </View>
          <View style={styles.defaultVerticalPadding}>
            <Text>{item.text}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View More</Text>
          </TouchableOpacity>
        </Card>
      )
    },
    [styles],
  )

  const onSwipeRight = (item: any) => {}

  const onSwipeLeft = (item: any) => {}

  const renderNoMoreCard = () => {
    return (
      <Card style={styles.cardStyle}>
        <Text style={styles.cardTitle}>No more content to swipe</Text>
      </Card>
    )
  }

  return (
    <SafeAreaView style={styles.root}>
      <SwipeCard
        data={swipeData}
        renderCard={renderCard}
        onSwipeRight={onSwipeRight}
        onSwipeLeft={onSwipeLeft}
        renderNoMoreCard={renderNoMoreCard}
      />
    </SafeAreaView>
  )
}

export default SwipeAnimation
