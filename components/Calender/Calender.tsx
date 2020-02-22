import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import {
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import { ThemeContext } from '../../src/utils/themeContext';

const Calender = (props) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const {theme} = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      maxHeight: screenWidth / 6,
    },
    tile: {
      marginRight: 1,
      marginLeft: 1,
      width: screenWidth / 6,
      height: screenWidth / 6,
      backgroundColor: theme.colors.primary,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  });

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