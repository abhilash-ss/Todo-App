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
import { Foundation, AntDesign } from '@expo/vector-icons';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import moment from 'moment';
interface ConfigTaskProps {
  navigation: {
    setOptions(options: Partial<{}>): void;
    navigate: (param: string) => {};
  };
  route: {
    params: {
      task: TaskProps;
    };
  };
}

interface TaskProps {
  key: number;
  title: string;
  description: string;
  date: Date;
  reminder: boolean;
}

export default function ConfigTask(props: ConfigTaskProps) {
  const [task, setTask] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time' | 'datetime' | 'countdown'>(
    'date',
  );
  const [show, setShow] = useState(false);
  const [reminder, setReminder] = useState(false);

  const onSubmit = () => {
    Keyboard.dismiss();
    const schedulingOptions = {
      // time: new Date().getTime() + 1 * 60 * 1000,
      time: moment(date).valueOf(),
    };

    const localNotification = { title: task, body: description };
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

  const saveTask = async (navigation: any, key: number, action: string) => {
    // TO DO: Fix types
    console.log('----saveTask', task);
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
      key: key,
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
        if (reminder) {
          onSubmit();
        }
      }
    } catch (error) {
      console.log('error on getItem', error);
    }

    try {
      if (action === 'SAVE') {
        taskList.push(newTask);
      } else {
        const index = taskList.findIndex((item: TaskProps) => item.key === key);
        taskList[index] = newTask;
      }
      await AsyncStorage.setItem('taskList', JSON.stringify(taskList));
      navigation.navigate('Home');
    } catch {
      alert('something went wrong!');
    }
    // AsyncStorage.getAllKeys((err, keys) => console.log('keys', keys));
  };

  const deleteTask = async (navigation: any, key: number) => {
    try {
      const response = await AsyncStorage.getItem('taskList');
      if (response) {
        const todos = JSON.parse(response);
        const updatedList = todos.filter((task: TaskProps) => task.key !== key);
        try {
          await AsyncStorage.setItem('taskList', JSON.stringify(updatedList));
        } catch {
          alert('something went wrong on delete!');
        }
        alert('task deleted successfully');
        navigation.navigate('Home');
      }
    } catch {
      alert('something went wrong on fetching data!');
    }
  };

  const deleteAlert = (navigation: any, key: number) => {
    Alert.alert(
      'Are you sure ?',
      'Delete this task ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => deleteTask(navigation, key) },
      ],
      { cancelable: false },
    );
  };

  useEffect(() => {
    askNotification();
    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    const listener = Notifications.addListener(handleNotification);
    return () => listener.remove();
  }, []);

  const setInitialState = (task: TaskProps) => {
    setTask(task.title);
    setDescription(task.description);
    setDate(new Date(task.date));
    setReminder(task.reminder);
  };

  useEffect(() => {
    const {
      route: { params },
    } = props;
    if (params) {
      console.log('useParams');
      setInitialState(params.task);
    }
  }, []);

  useEffect(() => {
    const {
      navigation,
      route: { params },
    } = props;

    const btnLabel = params ? 'UPDADTE' : 'SAVE';
    const key = params ? params.task.key : new Date().getUTCMilliseconds();
    const action = params ? 'UPDATE' : 'SAVE';

    navigation.setOptions({
      headerRight: () => (
        <View style={styles.header}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => saveTask(navigation, key, action)}
          >
            <Text style={styles.buttonLabel}>{btnLabel}</Text>
          </TouchableHighlight>
          {params && (
            <TouchableHighlight
              style={styles.delete}
              onPress={() => deleteAlert(navigation, key)}
            >
              <AntDesign name="delete" size={32} color="white" />
            </TouchableHighlight>
          )}
        </View>
      ),
      headerTitle: 'New Task',
      headerStyle: {
        backgroundColor: '#ED5D36',
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
              <Foundation name="calendar" size={32} color="#ED5D36" />
              <Text style={styles.dateTimeText}>{moment(date).calendar()}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => showMode('time')}>
            <View style={styles.dateTimeField}>
              <Foundation name="clock" size={32} color="#ED5D36" />
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

        {/* <View>
          <TextInput onChangeText={onSubmit} placeholder={'time in ms'} />
        </View> */}

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
  header: {
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    paddingLeft: 10,
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
    borderBottomColor: '#ED5D36',
  },
  button: {
    alignItems: 'center',
    // backgroundColor: '#DDDDDD',
    // padding: 5,
    // borderColor: '#fff',
    // borderWidth: 1,
    // borderRadius: 10,
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
