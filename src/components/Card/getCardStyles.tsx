import { StyleSheet } from 'react-native'

export const getCardStyles = () => {
  return StyleSheet.create({
    card: {
      borderRadius: 16,
      marginHorizontal: 12,
      marginVertical: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#FFF',
      backgroundColor: '#FFF5F2',
    },
  })
}
