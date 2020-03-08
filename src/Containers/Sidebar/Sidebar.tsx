import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

export default function Sidebar(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.title}>ToDoiser</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
      <DrawerItem
        label="About"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#ED5D36',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
