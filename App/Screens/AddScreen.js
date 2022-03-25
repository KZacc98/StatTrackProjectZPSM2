import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function AddScreen() {
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Add Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    fontStyle: 'italic',
    margin: 10,
    alignItems: 'center',
  },
});
