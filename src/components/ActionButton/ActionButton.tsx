import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export interface ActionButtonProps {
  onClick: () => any;
}

export default function ActionButton(props: ActionButtonProps) {
  return (
    <View style={styles.actionButton}>
      <TouchableOpacity onPress={() => props.onClick()}>
        <AntDesign name="pluscircle" size={60} color="coral" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'flex-end',
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 60,
    elevation: 3,
    bottom: 20,
    right: 30,
  },
});
