import * as React from 'react';
import { View, Text, TouchableHighlight, Alert, Modal } from 'react-native';

export interface ConfigTaskProps {
  isVisible?: boolean;
}

export default function ConfigTask(props: ConfigTaskProps) {
  console.log('==props==', props);
  return (
    <View style={{ marginTop: 22 }}>
      <Text>form</Text>
    </View>
  );
}
