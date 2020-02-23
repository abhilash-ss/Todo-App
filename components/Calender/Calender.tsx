import React, { useContext } from 'react';
// import { View, Text } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {
  StyleSheet,
  Dimensions,
  // ScrollView
} from 'react-native';
import { ThemeContext } from '../../src/utils/themeContext';
const Calender = () => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const { theme } = useContext(ThemeContext);
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
    },
    dateStrip: { 
      height: 70, 
      // paddingTop: 20, 
      // paddingBottom: 10, 
      backgroundColor: theme.colors.primary },
    dateNameStyle: {
      color: "white"
    }
  });

  const displayedDates = []
  let i = 30
  while (i) {
    displayedDates.push(i);
    i--
  }

  let customDatesStyles = [];
  let startDate = moment();
  for (let i = 0; i < 6; i++) {
    customDatesStyles.push({
      startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
      dateNameStyle: styles.dateNameStyle,
      dateNumberStyle: styles.dateNameStyle,
      // Random color...
      dateContainerStyle: styles.tile,
    });
  }
  return (
    <>
      <CalendarStrip
      showMonth={false}
        customDatesStyles={customDatesStyles}
        style={styles.dateStrip}
      />
      {/* <ScrollView style={styles.container} horizontal>
        {displayedDates.map((i) => <View key={i.toString()} style={styles.tile}>
          <Text>Feb</Text>
          <Text>{i}</Text>
        </View>)}
      </ScrollView> */}
    </>
  );
}
export default Calender