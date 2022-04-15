import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import * as React from 'react';
import {useEffect, useState} from 'react';



export default function SubjectsScreen({route, navigation}) {
  const [data, setData] = useState([]);


  useEffect(() => {
    getSubjects().then(r =>
      navigation.addListener('focus', () => getSubjects()),
    );
  }, []);

  const getSubjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/subject');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView >
      <View style={styles.items}>
        {data.map(val => (
          <TouchableOpacity
            key={val.subjectId}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#2e86c1',
              width: 150,
              height: 150,
              marginVertical: 25,
              backgroundColor: '#ADD8E6',
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate({
                name: 'Grades',
                params: {subjectId: val.subjectId},
              });
            }}>
            <Text style={{fontSize: 25}}>{val.title}</Text>
            <Image
              source={require('./sub.png')}
              style={{width: 80, height: 80}}
            />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewSubject');
          }}
          style={styles.button}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    borderColor: '#2e86c1',
    width: 150,
    height: 150,
    marginVertical: 25,
    borderRadius: 10,
  },
  plus: {
    fontSize: 100,
  },
});
