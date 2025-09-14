import React from 'react'
import { View } from 'react-native'

export interface SwipeCardProps {
  data: any[]
  renderCard: (item: any) => any
}

const SwipeCard = ({ data, renderCard }: SwipeCardProps) => {
  const renderCards = () => {
    return data.map(item => renderCard(item))
  }
  return <View>{renderCards()}</View>
}

export default SwipeCard
