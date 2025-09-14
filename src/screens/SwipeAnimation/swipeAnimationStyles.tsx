import { StyleSheet } from 'react-native'

export const getSwipeAnimationStyles = () => {
  return StyleSheet.create({
    defaultVerticalPadding: {
      paddingVertical: 8,
    },
    root: {
      flex: 1,
    },
    cardStyle: {
      alignItems: 'center',
    },
    cardTitle: {
      textTransform: 'uppercase',
      fontWeight: '600',
    },
    imageContainer: {
      overflow: 'hidden',
      width: '100%',
      paddingVertical: 8,
    },
    imageStyle: {
      width: '100%',
      height: 200,
      borderRadius: 12,
    },
  })
}
