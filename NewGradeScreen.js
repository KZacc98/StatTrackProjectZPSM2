import * as React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function NewGradeScreen({route, navigation}) {
  const subjectId = route.params.subjectId;
  const [state, setState] = React.useState([]);

  const addGrade = async () => {
    try {
      fetch('http://localhost:8080/api/v1/grade/', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subjectId: subjectId,
          gradeValue: state.grade,
          note: state.note,
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
        placeholder="Grade"
        value={state.grade}
        onChangeText={grade => setState({...state, grade})}
      />
      <TextInput
        style={styles.note}
        placeholder="Note"
        value={state.note}
        onChangeText={note => setState({...state, note})}
      />
      <View style={styles.horizontalView}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            addGrade();
            navigation.navigate('Grades', {
              params: {subjectId: subjectId},
            });
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    fontSize: 15,
    borderColor: '#2e86c1',
  },
  note: {
    height: 150,
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
    borderWidth: 1,
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
    borderWidth: 1,
    marginTop: 30,
    justifyContent: 'center',
    backgroundColor: '#58D68D',
    borderColor: '#28B463',
    borderRadius: 10,
  },
});
