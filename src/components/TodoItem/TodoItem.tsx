import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TodoProps } from '../../utils/Interfaces/todo';

interface TIProps {
  item: TodoProps;
  pressHandler: (key: TodoProps['key']) => any;
}

export default function TodoItem({ item, pressHandler }: TIProps) {
  return (
    <TouchableOpacity onPress={() => pressHandler(item.key)}>
      <View style={styles.item}>
        {/* <MaterialIcons name="delete" size={32} /> */}
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 5,
    marginVertical: 1,
    backgroundColor: '#d7d7d7',
    borderColor: '#d7d7d7',
    borderWidth: 1,
    flexDirection: 'row',
  },
  itemText: {
    // marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#747474',
  },
});
