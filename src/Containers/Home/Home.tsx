import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
} from 'react-native';
import Header from '../../components/Header/Header';
import TodoItem from '../../components/TodoItem/TodoItem';
// import AddTodo from '../../components/AddTodo/AddTodo';
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
    { title: 'one', key: '1' },
    { title: 'two', key: '2' },
    { title: 'three', key: '3' },
  ]);

  const pressHandler = (key: TodoProps['key']) => {
    // setTodos(prevTodos => {
    //   return prevTodos.filter(todo => todo.key !== key);
    // });
    const updatedList: TodoProps[] = todo.filter(task => task.key !== key);
    storeTaskList(updatedList);
  };

  const storeTaskList = async (todoList: TodoProps[]) => {
    try {
      await AsyncStorage.setItem('taskList', JSON.stringify(todoList));
    } catch {
      alert('something went wrong!');
    }
  };

  const fetchTaskList = async () => {
    try {
      const response = await AsyncStorage.getItem('taskList');
      if (response) {
        setTodos(JSON.parse(response));
      }
    } catch {
      console.log('error');
    }
    return [];
  };

  useEffect(() => {
    fetchTaskList();
  });

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
          {/* <AddTodo submitHandler={submitHandler} /> */}
          <CategoryCard title="Missed Tasks" verticalBarColor={'#E74535'}>
            <View>
              <FlatList
                data={todo}
                renderItem={({ item }) => (
                  <TodoItem item={item} pressHandler={pressHandler} />
                )}
              />
              {}
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
        <ActionButton
          onClick={() => {
            navigation.navigate('ConfigTask');
          }}
        />
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
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
