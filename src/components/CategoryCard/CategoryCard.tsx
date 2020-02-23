

import React, { useState, ReactNode, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Animated,
} from 'react-native';

interface CCProps {
    title: string,
    children: ReactNode,
    verticalBarColor: string
}

export default function CategoryCard({ title, children, verticalBarColor }: CCProps) {

    const [maxHeight] = useState(new Animated.Value(0)) 
    const [expanded, SetExpanded] = useState<Boolean>(false);

    useEffect(() => {
        if (expanded) {
            Animated.timing(
                maxHeight,
                {
                    toValue: 300,
                    duration: 300,
                }
            ).start();
        } else {
            Animated.timing(
                maxHeight,
                {
                    toValue: 0,
                    duration: 300,
                }
            ).start();
        }
    }, [expanded])

    return (
        <View style={styles.container} >
            <TouchableHighlight style={{ ...styles.title, borderLeftColor: verticalBarColor }} underlayColor={'transparent'} onPress={() => SetExpanded(!expanded)} >
                <Text style={styles.titleText} >{title}</Text>
            </TouchableHighlight>

            <Animated.View style={{ ...styles.listContainer, maxHeight }}  >
                {children}
            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#d7d7d7',
        maxHeight: 0,
        overflow: 'hidden',
    },
    title: {
        padding: 5,
        borderLeftWidth: 6,
        backgroundColor: '#d7d7d7'
    },
    titleText: {
        paddingVertical: 10,
        fontSize: 25,
        color: '#747474'
    },
    container: {
        marginVertical: 10,
    }
});