import React from 'react'
import { View } from 'react-native'
import { getCardStyles } from './getCardStyles'
import { CardProps } from './CardTypes'

const Card = ({ children, style }: CardProps) => {
  const styles = getCardStyles()
  return <View style={[styles.card, style]}>{children}</View>
}

export default Card
