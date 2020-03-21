import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

interface SwipeListProps {
  list: any;
}
//TO DO: Fix typo
export default function SwipeList(props: SwipeListProps) {
  return (
    <View>
      <SwipeListView
        data={props.list}
        renderItem={(data: any, rowMap) => (
          <View key={`key${data.index}`} style={styles.item}>
            <Text style={styles.itemText}>{data.item.title}</Text>
          </View>
        )}
        keyExtractor={(item: any) => `key-${item.key}`}
        renderHiddenItem={(data, rowMap) => (
          <View key={`key${data.index}`} style={styles.rowBack}>
            <Text>Edit</Text>
            <Text>Done</Text>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    </View>
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
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    // backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
