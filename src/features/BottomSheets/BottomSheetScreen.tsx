import React, { useRef, useState, useMemo, useCallback } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const BottomSheetScreen = () => {
  const [isSwipeToCloseEnabled, setIsSwipeToCloseEnabled] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const openCallbackRef = useRef<(() => void) | null>(null)
  const closeCallbackRef = useRef<(() => void) | null>(null)

  const snapPoints = useMemo(() => ['40%'], [])

  const openSheet = useCallback((callback?: () => void) => {
    // if (callback && typeof callback === 'function') {
    //   openCallbackRef.current = callback
    // } else {
    //   openCallbackRef.current = null
    // }
    bottomSheetModalRef.current?.present()
  }, [])

  const closeSheet = useCallback((callback?: () => void) => {
    if (callback && typeof callback === 'function') {
      closeCallbackRef.current = callback
    } else {
      closeCallbackRef.current = null
    }
    bottomSheetModalRef.current?.dismiss()
  }, [])

  const checkIsOpen = useCallback(() => {
    return isSheetOpen
  }, [isSheetOpen])

  const handleSheetChanges = useCallback((index: number) => {
    const currentlyOpen = index >= 0
    setIsSheetOpen(currentlyOpen)

    if (currentlyOpen && openCallbackRef.current) {
      openCallbackRef.current()
      openCallbackRef.current = null
    } else if (!currentlyOpen && closeCallbackRef.current) {
      closeCallbackRef.current()
      closeCallbackRef.current = null
    }
  }, [])

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={'close'} // Set pressBehavior to 'close'
      />
    ),
    [],
  )

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Text style={styles.header}>React Native Bottom Sheet</Text>

        <View style={styles.buttonContainer}>
          <Button
            color={'#E50046'}
            title="Open Sheet"
            onPress={() => {
              openSheet(() => {
                Alert.alert('Callback!', 'Sheet finished opening!')
              })
            }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            color={'#E50046'}
            title="Close Sheet"
            onPress={() =>
              closeSheet(() => {
                Alert.alert('Callback!', 'Sheet finished closing!')
              })
            }
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            color={'#E50046'}
            title={`Is Sheet Open? ${checkIsOpen() ? 'Yes' : 'No'}`}
            onPress={() =>
              Alert.alert(
                'Sheet Status',
                `The sheet is currently ${checkIsOpen() ? 'Open' : 'Closed'}.`,
              )
            }
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            color={'#E50046'}
            title={`Toggle Swipe Close (${
              isSwipeToCloseEnabled ? 'Enabled' : 'Disabled'
            })`}
            onPress={() => setIsSwipeToCloseEnabled(prev => !prev)}
          />
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={isSwipeToCloseEnabled}
          backgroundStyle={styles.sheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
          backdropComponent={renderBackdrop}>
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.contentContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => closeSheet()}>
                <Icon name="close-circle" size={24} color="#626F47" />
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Bottom Sheet Content</Text>
              <Text>This area holds the content for the bottom sheet.</Text>
              <Text style={{ marginVertical: 15 }}>
                Swipe down to close is {isSwipeToCloseEnabled ? 'ON' : 'OFF'}.
              </Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Close From Inside"
                  color={'#E50046'}
                  onPress={() => closeSheet()}
                />
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#FDB7EA',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    marginBottom: 15,
    width: '80%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  sheetBackground: {
    backgroundColor: '#FBF3B9',
    borderRadius: 20,
  },
  handleIndicator: {
    backgroundColor: '#cccccc',
    width: 50,
  },
})

export default BottomSheetScreen
