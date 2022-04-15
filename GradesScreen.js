import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component';

export default function GradesScreen({route, navigation}) {
  const [data, setData] = useState([]);

  const tableHead = ['Grade', 'Note'];
  const subjectId = route.params.subjectId;

  useEffect(() => {
    getGrades().then(r =>
        navigation.addListener('focus', () => getGrades()),
    );
  }, []);

  const getGrades = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/v1/grade/' + subjectId,
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  const tab = [];

  for (let i = 0; i < data.length; i++) {
    tab[i] = [data[i].gradeValue, data[i].note];
  }

  return (
    <ScrollView>
      <View style={styles.containter}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tab} textStyle={styles.text} />
        </Table>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate({
              name: 'NewGrade',
              params: {subjectId: subjectId},
            });
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Add Grade</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 30,
    marginVertical: 30,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginHorizontal: 20,
    marginTop: 50,
    backgroundColor: '#ADD8E6',
    borderColor: '#2e86c1',
    borderWidth: 2,
    borderRadius: 10,
  },
});
