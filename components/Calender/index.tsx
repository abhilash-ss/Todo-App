import * as React from 'react';
import { View, Text } from 'react-native';
import {
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import {theme} from '../../src/constants'
const Calender = (props) => {
  const displayedDates = [1,2,3,4,5,6,7,8,9,10,11,12,13,16]
  return (
    <ScrollView style={styles.container} horizontal>
      {displayedDates.map((i)=><View key={i.toString()} style={styles.tile}>
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
    flex: 1,
    backgroundColor: '#fff',
    height:100
  },
  tile:{
    marginRight:1,
    marginLeft:1,
    width: screenWidth/6,
    height: screenWidth/6,
    backgroundColor: theme.one.main,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
});
