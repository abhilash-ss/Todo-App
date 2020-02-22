

import React, { useState, ReactNode } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

interface CCProps {
    title: string,
    children: ReactNode,
    verticalBarColor: string
}

export default function CategoryCard({ title, children, verticalBarColor }: CCProps) {

    const [expanded, SetExpanded] = useState<Boolean>(false);

    return (
        <View style={styles.container} >
            <TouchableHighlight style={{ ...styles.title, borderLeftColor: verticalBarColor }} underlayColor={'transparent'} onPress={() => SetExpanded(!expanded)} >
                <Text style={styles.titleText} >{title}</Text>
            </TouchableHighlight>
            {expanded &&
                <View style={styles.listContainer} >
                    {children}
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#d7d7d7'
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
        marginTop: 10,
        marginBottom: 10,
        marginVertical: 10,
    }
});