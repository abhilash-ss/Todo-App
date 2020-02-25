import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Keyboard,
  Platform,
  AsyncStorage,
  Alert,
} from 'react-native';
import DateTimePicker, {
  AndroidEvent,
  Event,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
interface ConfigTaskProps {
  navigation: {
    setOptions(options: Partial<{}>): void;
    navigate: (param: string) => {};
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

  const saveTask = async (navigation: any) => {
    // TO DO: Fix types
    if (task.length < 3) {
      Alert.alert('OOPS!', 'Todos must be 3 chars long', [
        {
          text: 'OK',
          onPress: () => console.log('alert closed'),
        },
      ]);
      return;
    }
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
        taskList = JSON.parse(response);
      }
    } catch (error) {
      console.log('error on getItem', error);
    }

    try {
      taskList.push(newTask);
      await AsyncStorage.setItem('taskList', JSON.stringify(taskList));
      navigation.navigate('Home');
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
          <TouchableHighlight
            style={styles.button}
            onPress={() => saveTask(navigation)}
          >
            <Text style={styles.buttonLabel}>SAVE</Text>
          </TouchableHighlight>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#79be53',
      },
      headerTintColor: '#fff',
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
  button: {
    alignItems: 'center',
    // backgroundColor: '#DDDDDD',
    // padding: 5,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
});
