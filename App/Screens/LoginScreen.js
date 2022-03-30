import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import GlobalStyle from '../Utils/GlobalStyle';

const [login, setLogin] = useState('');
const setData = () => {
  if (login.length == 0) {
    Alert.alert('Warning', 'Login too short');
  } else {
  }
};
export default function LoginScreen() {
  return (
    <View style={GlobalStyle.body}>
      <Text style={GlobalStyle.text}>Login Screen</Text>

      <TextInput
        style={styles.textInput}
        placeholder={'Enter Login'}
        onChangeText={value => setLogin(value)}
      />
      <Button title={'Login'} onPress={setData} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 150,
    marginBottom: 15,
  },
});
