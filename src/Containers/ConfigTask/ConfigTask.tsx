import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Keyboard,
  Platform,
  AsyncStorage,
  Alert,
  CheckBox,
} from 'react-native';
import DateTimePicker, {
  AndroidEvent,
  Event,
} from '@react-native-community/datetimepicker';
import { Foundation } from '@expo/vector-icons';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import moment from 'moment';
interface ConfigTaskProps {
  navigation: {
    setOptions(options: Partial<{}>): void;
    navigate: (param: string) => {};
  };
}

const localNotification = { title: 'done', body: 'done!' };

const onSubmit = text => {
  Keyboard.dismiss();
  const schedulingOptions = {
    time: new Date().getTime() + 10 * 60 * 1000,
  };
  // Notifications show only when app is not active.
  // (ie. another app being used or device's screen is locked)
  Notifications.scheduleLocalNotificationAsync(
    localNotification,
    schedulingOptions,
  );
};
const handleNotification = () => {
  console.warn('ok! got your notif');
};

const askNotification = async () => {
  // We need to ask for Notification permissions for ios devices
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Constants.isDevice && status === 'granted')
    console.log('Notification permissions granted.');
};

export default function ConfigTask(props: ConfigTaskProps) {
  const [task, setTask] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time' | 'datetime' | 'countdown'>(
    'date',
  );
  const [show, setShow] = useState(false);
  const [reminder, setReminder] = useState(false);

  const onChange = (event: Event | AndroidEvent, selectedDate?: Date) => {
    const { type } = event;
    if (type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
    setShow(Platform.OS === 'ios' ? true : false);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
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
      reminder: reminder,
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

  const showNotification = () => {};

  useEffect(() => {
    askNotification();
    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    const listener = Notifications.addListener(handleNotification);
    return () => listener.remove();
  }, []);

  useEffect(() => {
    const { navigation } = props;
    navigation.setOptions({
      headerRight: () => (
        <View style={{ paddingRight: 10 }}>
          <TouchableHighlight
            style={styles.button}
            // onPress={() => saveTask(navigation)}
            onPress={() => showNotification()}
          >
            <Text style={styles.buttonLabel}>SAVE</Text>
          </TouchableHighlight>
        </View>
      ),
      headerTitle: 'New Task',
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

        <View style={styles.dateTimeContainer}>
          <TouchableHighlight onPress={() => showMode('date')}>
            <View style={styles.dateTimeField}>
              <Foundation name="calendar" size={32} color="green" />
              <Text style={styles.dateTimeText}>{moment(date).calendar()}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => showMode('time')}>
            <View style={styles.dateTimeField}>
              <Foundation name="clock" size={32} color="green" />
              <Text style={styles.dateTimeText}>
                {moment(date).format('LT')}
              </Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.checkBoxWrapper}>
          <CheckBox
            value={reminder}
            onValueChange={() => setReminder(!reminder)}
          />
          <Text style={styles.checkBoxLabel}>Enable reminder</Text>
        </View>

        <View>
          <TextInput onChangeText={onSubmit} placeholder={'time in ms'} />
        </View>

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
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dateTimeField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  dateTimeText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    marginBottom: 20,
    paddingHorizontal: 0,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#79be53',
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
  checkBoxWrapper: {
    marginTop: 15,
    flexDirection: 'row',
  },
  checkBoxLabel: {
    marginLeft: 10,
  },
});
