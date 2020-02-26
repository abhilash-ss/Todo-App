import React, { useState, ReactNode, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
  Image,
} from 'react-native';
import backgroungImage from '../../../assets/collapse-bkg.jpeg';

interface CCProps {
  title: string;
  children: ReactNode;
  verticalBarColor: string;
}

export default function CategoryCard({
  title,
  children,
  verticalBarColor,
}: CCProps) {
  const [maxHeight] = useState(new Animated.Value(0));
  const [expanded, setExpanded] = useState<Boolean>(false);

  useEffect(() => {
    if (expanded) {
      Animated.timing(maxHeight, {
        toValue: 300,
        duration: 300,
      }).start();
    } else {
      Animated.timing(maxHeight, {
        toValue: 0,
        duration: 300,
      }).start();
    }
  }, [expanded]);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={[
          { ...styles.title, borderLeftColor: verticalBarColor },
          expanded && styles.title_expand,
        ]}
        underlayColor={'transparent'}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={expanded ? styles.titleText_expand : styles.titleText}>
          {title}
        </Text>
      </TouchableHighlight>

      <Animated.View style={{ ...styles.listContainer, maxHeight }}>
        {children}
        <Image source={backgroungImage} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 5,
    // borderWidth: 1,
    // borderTopWidth: 0,
    // borderColor: '#d7d7d7',
    maxHeight: 0,
    overflow: 'hidden',
    // marginVertical: 20,
  },
  title: {
    padding: 5,
    borderLeftWidth: 15,
    backgroundColor: '#d7d7d7',
    // marginVertical: 20,
  },
  title_expand: {
    marginBottom: 20,
    borderLeftWidth: 20,
    backgroundColor: '#fff',
  },
  titleText: {
    paddingVertical: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#747474',
  },
  titleText_expand: {
    // paddingVertical: 10,
    fontSize: 40,
    // fontWeight: 'bold',
    color: 'coral',
  },
  container: {
    marginVertical: 5,
  },
});
