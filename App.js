import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Linking,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput, ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const onPressHandler = () => {
    if (name.length > 1) {
      setSubmitted(!submitted);
    } else {
      // Alert.alert('Warning', 'Name too short', [
      //   {text: 'OK', onPress: () => console.warn('ok pressed')},
      // ]);
      ToastAndroid.show('ToastMessage displayed', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Write ur name</Text>
      <TextInput
        style={styles.input}
        placeholder={'eg. john'}
        onChangeText={value => setName(value)}
      />
      <TouchableOpacity onPress={onPressHandler} style={styles.button}>
        <Text style={styles.text}>{submitted ? 'clear' : 'submit'}</Text>
      </TouchableOpacity>
      {submitted ? (
        <Text style={styles.text}>you are registered as: {name}</Text>
      ) : null}
    </View>
  );
};

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
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  button: {
    backgroundColor: '#6fb9c4',
    width: 150,
    height: 50,
    alignItems: 'center',
  },
});

export default App;
