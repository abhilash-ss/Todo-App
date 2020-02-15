import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/Header';

export default function App() {
  const [todo, setTodo] = useState([
    { text: 'one', key: '1' },
    { text: 'two', key: '2' },
    { text: 'three', key: '3' }
  ]);
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        {/* {todo form} */}
        <View style={styles.list}>
          <Text>sdfds</Text>
          <FlatList data={todo} renderItem={({item}) => <Text>{item.text}</Text>} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40
  },
  list: {
    marginTop: 20
  }
});
