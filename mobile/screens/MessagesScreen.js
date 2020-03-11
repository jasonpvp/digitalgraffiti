import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import MessageContext from '../contexts/messageContext';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler'

export default function MessagesScreen() {
  const messageContext = React.useContext(MessageContext.Context)
  const [messageIndex, setMessageIndex] = React.useState(0)
  const nextMessage = () => {
    const nextIndex = messageIndex === messageContext.messages.length - 1 ? 0 : messageIndex + 1
    setMessageIndex(nextIndex)
  }

  const prevMessage = () => {
    const prevIndex = messageIndex === 0 ? messageContext.messages.length - 1 : messageIndex - 1
    setMessageIndex(prevIndex)
  }

  const onFlingLeft = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      nextMessage()
    }
  }

  const onFlingRight = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      prevMessage()
    }
  }

  React.useEffect(() => {
    messageContext.getMessages()
  }, [])

  const message = messageContext.messages[messageIndex] || {message: 'Loading...'}

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={onFlingLeft}
    >
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={onFlingRight}
      >
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight onPress={nextMessage}>
            <Image
              source={require('../assets/images/arrowRight.gif')}
              style={{width: 60, height: 4, transform: [{rotate: '180deg'}]}}
            />
          </TouchableHighlight>
          <View style={{width: '50%', alignItems: 'center'}}>
            <Text style={{textAlign: 'center'}}>{message.message}</Text>
          </View>
          <TouchableHighlight onPress={nextMessage}>
            <Image
              source={require('../assets/images/arrowRight.gif')}
              style={{width: 60, height: 4}}
            />
          </TouchableHighlight>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}
