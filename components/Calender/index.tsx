import * as React from 'react';
import { View, Text } from 'react-native';
import {
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import { themes, currentTheme } from '../../src/constants'
const Calender = (props) => {

  const displayedDates = []
  let i = 30
  while (i) {
    displayedDates.push(i);
    i--
  }
  return (
    <ScrollView style={styles.container} horizontal>
      {displayedDates.map((i) => <View key={i.toString()} style={styles.tile}>
        <Text>Feb</Text>
        <Text>{i}</Text>
      </View>)}
    </ScrollView>
  );
}
export default Calender

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    maxHeight: screenWidth / 6,
  },
  tile: {
    marginRight: 1,
    marginLeft: 1,
    width: screenWidth / 6,
    height: screenWidth / 6,
    backgroundColor: themes[currentTheme].a,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
