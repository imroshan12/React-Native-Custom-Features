import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getSwipeAnimationStyles } from './swipeAnimationStyles'
import SwipeCard from './components/SwipeCard'
import { Text, View } from 'react-native'
import { swipeData } from '../../../mocks/swipeMockData'
import Card from '../../components/Card'
import { Image } from 'react-native'

const SwipeAnimation = () => {
  const styles = getSwipeAnimationStyles()

  const renderCard = (item: any) => {
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
      </Card>
    )
  }
  return (
    <SafeAreaView style={styles.root}>
      <SwipeCard data={swipeData} renderCard={renderCard} />
    </SafeAreaView>
  )
}

export default SwipeAnimation
