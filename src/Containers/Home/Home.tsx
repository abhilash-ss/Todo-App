import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header/Header';
import Calender from '../../components/Calender/Calender';
import ActionButton from '../../components/ActionButton/ActionButton';
import { TodoProps } from '../../utils/Interfaces/todo';
import CategoryCollpase from '../../components/CategoryCollapse/CategoryCollapse';
import moment from 'moment';

interface HProps {
  navigation: any;
}

export default function Home(props: HProps) {
  const { navigation } = props;
  const [todo, setTodos] = useState<TodoProps[]>([]);

  const pressHandler = (key: TodoProps['key']) => {
    // const updatedList: TodoProps[] = todo.filter(task => task.key !== key);
    // storeTaskList(updatedList);
    // fetchTaskList();
    const task: TodoProps | undefined = todo.find(item => item.key === key);
    navigation.navigate('ConfigTask', { task: task });
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
    console.log('todoTask in useEffect', todo.length);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTaskList();
    }, []),
  );

  const getTodayTasks = () => {
    let task: TodoProps[] = [];
    const today = moment().format('DD-MM-YYYY');

    todo.map((td: TodoProps) => {
      const todoDate = moment(td.date).format('DD-MM-YYYY');
      if (todoDate === today) {
        task.push(td);
      }
    });

    return task;
  };

  const getUpcomingTasks = () => {
    let task: TodoProps[] = [];

    todo.map((td: TodoProps) => {
      const todoDate = td.date;

      if (moment(todoDate).year() > moment().year()) {
        task.push(td);
      } else if (moment(todoDate).year() === moment().year()) {
        if (moment(todoDate).month() > moment().month()) {
          task.push(td);
        } else if (moment(todoDate).month() === moment().month()) {
          if (moment(todoDate).date() > moment().date()) {
            task.push(td);
          }
        }
      }
      // if (moment().diff(td.date) > 0) {
      //   task.push(td);
      // }
    });

    return task;
  };

  const getMissedTasks = () => {
    let task: TodoProps[] = [];

    todo.map((td: TodoProps) => {
      const todoDate = td.date;
      // TODO: Need to change the logic
      if (moment(todoDate).year() < moment().year()) {
        task.push(td);
      } else if (moment(todoDate).year() === moment().year()) {
        if (moment(todoDate).month() < moment().month()) {
          task.push(td);
        } else if (moment(todoDate).month() === moment().month()) {
          if (moment(todoDate).date() < moment().date()) {
            task.push(td);
          }
        }
      }
    });

    return task;
  };

  const getDoneTasks = () => {
    let task: TodoProps[] = [];

    todo.map((td: TodoProps) => {
      if (moment().diff(td.date) < 0) {
        task.push(td);
      }
    });

    return task;
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
        <ScrollView style={styles.content} nestedScrollEnabled={true}>
          <CategoryCollpase
            items={[
              {
                key: '0',
                title: 'Today Tasks!',
                uiType: '#ED5D36',
                selected: true,
                data: getTodayTasks(),
                onClick: pressHandler,
              },
              {
                key: '1',
                title: 'Missed Tasks',
                uiType: '#E74535',
                selected: false,
                data: getMissedTasks(),
                onClick: pressHandler,
              },
              {
                key: '2',
                title: 'Upcoming Tasks',
                uiType: '#ED5D36',
                selected: false,
                data: getUpcomingTasks(),
                onClick: pressHandler,
              },
              {
                key: '3',
                title: 'Done Tasks',
                uiType: '#336806',
                selected: false,
                data: getDoneTasks(),
                onClick: pressHandler,
              },
            ]}
          />
        </ScrollView>
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
    marginVertical: 20,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
