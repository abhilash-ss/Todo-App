import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';

interface AProps {
  submitHandler: (text:any) => any
}

export default function AddTodo({submitHandler}:AProps) {
  const [text, setText] = useState<any>('');

  const changeHandler = (value:any) => {
    setText(value);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder='new todo...'
        onChangeText={changeHandler}
      />
      <Button onPress={() => submitHandler(text)} title='add todo' color='coral' />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 0,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  }
});
