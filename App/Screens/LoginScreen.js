import React from 'react';
import {Text, View} from 'react-native';
import GlobalStyle from '../Utils/GlobalStyle';

export default function LoginScreen() {
  return (
    <View style={GlobalStyle.body}>
      <Text style={GlobalStyle.text}>Login Screen</Text>
    </View>
  );
}
