import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Header from '../Header/Header';
import TodoItem from '../TodoItem/TodoItem';
import AddTodo from '../AddTodo/AddTodo';
// import Drawer from '../Drawer/Drawer';

interface HProps {
  navigation:any
}

export default function Home(props:HProps) {
  const { navigation } = props;
  const [todo, setTodos] = useState([
    { text: 'one', key: '1' },
    { text: 'two', key: '2' },
    { text: 'three', key: '3' },
  ]);

  const pressHandler = (key:any) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key !== key);
    });
  };

  const submitHandler = (text:any) => {
    if (text.length > 3) {
      setTodos(prevTodos => {
        return [{ text: text, key: Math.random().toString() }, ...prevTodos];
      });
    } else {
      Alert.alert('OOPS!', 'Todos must be 3 chars long', [
        {
          text: 'OK',
          onPress: () => console.log('alert closed'),
        },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log('dismiss keyboard');
      }}
    >
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todo}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
