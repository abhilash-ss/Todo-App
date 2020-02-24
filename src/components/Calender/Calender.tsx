import React, { useContext } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import {
  StyleSheet,
} from 'react-native';
import { ThemeContext } from '../../utils/themeContext';
const Calender = () => {
  const { theme } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    dateStrip: {
      color: theme.colors.quaternary ,
      paddingTop: 10,
      paddingBottom: 10,
      height: 70,
      backgroundColor: theme.colors.primary
    },
    dateNameStyle: {
      color: "white"
    }
  });

  return (
    <>
      <CalendarStrip
        showMonth={true}
        style={styles.dateStrip}
        dateNameStyle={{ color: theme.colors.quaternary }}
        dateNumberStyle={{ color: theme.colors.quaternary }}
        highlightDateNumberStyle={{ color: theme.colors.quinary }}
        highlightDateNameStyle={{ color: theme.colors.quinary }}

      />
    </>
  );
};
export default Calender;
