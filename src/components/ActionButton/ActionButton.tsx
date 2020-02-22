import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export interface ActionButtonProps {
  onClick: () => any;
}

export default function ActionButton(props: ActionButtonProps) {
  return (
    <View style={styles.actionButton}>
      <TouchableOpacity>
        <Ionicons
          name="md-add-circle"
          size={70}
          color="coral"
          onPress={() => props.onClick()}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'flex-end',
    bottom: 20,
    right: 30,
  },
});
