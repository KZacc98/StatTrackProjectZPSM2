import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  AsyncStorage, Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'react-native-vector-icons/dist';




export default function NewSubjectScreen({navigation}) {
  const [state, setState] = React.useState([]);


  const save = async () => {
    addSubject();
    await storeData([state]);
    navigation.navigate('Subjects', {deviceData: await getData()});
  };

  const storeData = async value => {
    try {
      console.log(value);
      var existingValues = await getData();
      var jsonValue = JSON.stringify(value);
      if (existingValues != null) {
        existingValues.push(value[0]);
        jsonValue = JSON.stringify(existingValues);
        console.log(existingValues);
      }

      await AsyncStorage.setItem('key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
    }
  };

  const addSubject = async () => {
    try {
      fetch('http://localhost:8080/api/v1/subject/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: state.subjectName,
          secondParam: [],
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.modal}>
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={state.subjectName}
        onChangeText={subjectName => setState({...state, subjectName})}
      />

      <View style={styles.horizontalView}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={save}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 30,
    marginVertical: 30,
  },
  button: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    width: 150,
    height: 150,
    marginVertical: 25,
  },
  plus: {
    fontFamily: 'PTSerif-Bold',
    fontSize: 100,
  },
  modal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  input: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    fontSize: 15,
    borderColor: '#2e86c1',
  },
  horizontalView: {
    flexDirection: 'row',
  },
  button1: {
    alignItems: 'center',
    width: 135,
    height: 50,
    borderWidth: 2,
    marginTop: 30,
    justifyContent: 'center',
    marginRight: 30,
    backgroundColor: '#EC7063',
    borderColor: '#CB4335',
    borderRadius: 10,
  },
  button2: {
    alignItems: 'center',
    width: 135,
    height: 50,
    borderWidth: 2,
    marginTop: 30,
    justifyContent: 'center',
    backgroundColor: '#58D68D',
    borderColor: '#28B463',
    borderRadius: 10,
  },
});
