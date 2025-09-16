import { StyleSheet } from 'react-native'

export const getSwipeAnimationStyles = () => {
  return StyleSheet.create({
    defaultVerticalPadding: {
      paddingVertical: 8,
    },
    root: {
      flex: 1,
      backgroundColor: '#687FE5',
    },
    cardStyle: {
      alignItems: 'center',
      backgroundColor: '#FFEDF3',
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
    button: {
      backgroundColor: '#687FE5',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 24,
      marginVertical: 12,
      borderWidth: 1,
      borderColor: '#FFEDF3',
      width: '60%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontWeight: '600',
      textTransform: 'uppercase',
    },
  })
}
