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
import Header from '../../components/Header/Header';
import TodoItem from '../../components/TodoItem/TodoItem';
import AddTodo from '../../components/AddTodo/AddTodo';
import Calender from '../../components/Calender/Calender';

// import Drawer from '../Drawer/Drawer';
import ActionButton from '../../components/ActionButton/ActionButton';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { TodoProps } from '../../utils/Interfaces/todo';

interface HProps {
  navigation: any;
}

export default function Home(props: HProps) {
  const { navigation } = props;
  const [todo, setTodos] = useState<TodoProps[]>([
    { text: 'one', key: '1' },
    { text: 'two', key: '2' },
    { text: 'three', key: '3' },
  ]);

  const pressHandler = (key: TodoProps['key']) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key !== key);
    });
  };

  const submitHandler = (text: string) => {
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
      }}
    >
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Calender />
        <View style={styles.content}>
          {/* TO DO : add today task list and notifications */}
          <AddTodo submitHandler={submitHandler} />
          <CategoryCard title="Missed Tasks" verticalBarColor={'#E74535'}>
            <View>
              <FlatList
                data={todo}
                renderItem={({ item }) => (
                  <TodoItem item={item} pressHandler={pressHandler} />
                )}
              />
            </View>
          </CategoryCard>
          <CategoryCard title="Upcoming Tasks" verticalBarColor={'#ED5D36'}>
            <View>
              <FlatList
                data={todo}
                renderItem={({ item }) => (
                  <TodoItem item={item} pressHandler={pressHandler} />
                )}
              />
            </View>
          </CategoryCard>
          <CategoryCard title="Done Tasks" verticalBarColor={'#336806'}>
            <View>
              <FlatList
                data={todo}
                renderItem={({ item }) => (
                  <TodoItem item={item} pressHandler={pressHandler} />
                )}
              />
            </View>
          </CategoryCard>
        </View>
        <ActionButton onClick={() => navigation.navigate('ConfigTask')} />
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
