import * as React from 'react';
import { Button, StyleSheet, TextInput, View, TouchableHighlight } from 'react-native';
import MessageContext from '../contexts/messageContext';

export default function ComposeScreen({navigation}) {
  const messageContext = React.useContext(MessageContext.Context)
  const [inputState, changeInputState] = React.useState('')

  const onChangeText = (value) => {
    console.log({value})
    changeInputState(value)
  }

  const onCompose = () => {
    if (inputState.length > 0) {
      messageContext.sendMessage({message: inputState})
      changeInputState('')
      console.log({navigation})
      navigation.navigate('Messages')
    }
  }

  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={{width: '80%', height: '30%', borderColor: '#999', borderWidth: 1, textAlign: 'center', borderRadius: 10}}
        value={inputState}
        onChangeText={onChangeText}
        onEndEditing={onCompose}
        autoFocus
      />
      <Button
        onPress={onCompose}
        title='Done'
        disabled={inputState.length === 0}
      />
    </View>
  );
}
