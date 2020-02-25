import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  AsyncStorage,
} from 'react-native';
import DateTimePicker, {
  AndroidEvent,
  Event,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
interface ConfigTaskProps {
  navigation: {
    setOptions(options: Partial<{}>): void;
  };
}

export default function ConfigTask(props: ConfigTaskProps) {
  const [task, setTask] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<'date' | 'time' | 'datetime' | 'countdown'>(
    'date',
  );
  const [show, setShow] = useState(false);

  const onChange = (event: Event | AndroidEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
    setShow(Platform.OS === 'ios' ? true : false);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const saveTask = async () => {
    const newTask = {
      key: new Date().getUTCMilliseconds(),
      title: task,
      description: description,
      date: date,
    };
    let taskList = [];
    try {
      const response = await AsyncStorage.getItem('taskList');
      // for (let i = 0; i < response.length; i++) {
      //   await AsyncStorage.removeItem('taskList');
      // }
      if (response) {
        console.log('=============');
        // console.log(JSON.parse(response));
        taskList = JSON.parse(response);
        console.log(taskList);
      }
    } catch (error) {
      console.log('error on getItem', error);
    }

    try {
      taskList.push(newTask);
      // console.log('cjhec', taskList);
      // console.log(taskList);
      await AsyncStorage.setItem('taskList', JSON.stringify(taskList));
    } catch {
      alert('something went wrong!');
    }
    // AsyncStorage.getAllKeys((err, keys) => console.log('keys', keys));
  };

  useEffect(() => {
    const { navigation } = props;
    navigation.setOptions({
      headerRight: () => (
        <View style={{ paddingRight: 10 }}>
          <Button onPress={() => saveTask()} title="Save" color="blue" />
        </View>
      ),
    });
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="new task..."
          value={task}
          onChangeText={value => setTask(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Task description..."
          value={description}
          onChangeText={value => setDescription(value)}
        />
        <Text>Due date</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose date..."
          value={moment(date)
            .subtract(10, 'days')
            .calendar()}
          onTouchStart={showDatepicker}
          // onChange={() => console.log('onChange')}
        />
        <Text>Due time</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose time..."
          value={moment().format('LT')}
          onTouchStart={showTimepicker}
          // onChange={() => console.log('onChange')}
        />
        <View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={mode}
              // is24Hour={true}
              // display="default"
              onChange={onChange}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 0,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
