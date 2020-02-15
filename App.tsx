import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/Header';
import TodoItem from './components/TodoItem';
export default function App() {
  const [todo, setTodos] = useState([
    { text: 'one', key: '1' },
    { text: 'two', key: '2' },
    { text: 'three', key: '3' }
  ]);

  const pressHandler = key => {
    setTodos(prevTodos => {
      console.log(prevTodos)
      return prevTodos.filter(todo => todo.key !== key);
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        {/* {todo form} */}
        <View style={styles.list}>
          <Text>sdfds</Text>
          <FlatList
            data={todo}
            renderItem={({ item }) => (
              <TodoItem item={item} pressHandler={pressHandler} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 40
  },
  list: {
    marginTop: 20
  }
});
