import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {PieChart} from 'react-native-gifted-charts/src/PieChart';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({navigation}) {
  const [data, setData] = useState([]);


  useEffect(() => {
    getSubjects().then(r =>
      navigation.addListener('focus', () => getSubjects()),
    );
  }, []);

  const eachSubAvg = () => {
    const subjcts = [];
    let sum2 = 0;
    let len2 = 0;

    for (let i = 0; i < data.length; i++) {
      sum2 = 0;
      len2 = 0;
      for (let j = 0; j < data[i].gradeList.length; j++) {
        sum2 += data[i].gradeList[j].gradeValue;
        len2++;
      }

      subjcts.push({
        title: data[i].title,
        avg: sum2 / len2,
        sub: data[i].title,
      });
    }

    return subjcts;
  };

  const allSubAvg = () => {
    let sum = 0;
    let len = 0;

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].gradeList.length; j++) {
        sum += data[i].gradeList[j].gradeValue;
        len++;
      }
    }
    return sum / len;
  };

  const allSubData = () => {
    const allAvg = allSubAvg();
    const eachAvgArr = eachSubAvg();
    const howMuchOfPie = [];

    for (let i = 0; i < eachAvgArr.length; i++) {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      howMuchOfPie.push({
        value: (eachAvgArr[i].avg * 100) / allAvg,
        color: '#' + randomColor,
        text: Math.round(eachAvgArr[i].avg * 100) / 100,
        sub: eachAvgArr[i].sub,
      });
    }
    return howMuchOfPie;
  };

  const pieData2 = allSubData();
  const pieData = [
    {value: 30, color: '#177AD5', text: '54%', label: 'Matematyka'},
    {value: 30, color: '#79D2DE', text: '30%', label: 'Fizyka'},
    {value: 26, color: '#ED6665', text: '26%', label: 'Religia'},
  ];

  const getSubjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/subject');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  const renderLegend = (text, color) => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 12}}>
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || 'white',
          }}
        />
        <Text style={{color: 'black', fontSize: 16}}>{text || ''}</Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.bgview}>
          <Text style={styles.text}>Stat Track App</Text>
          <Image
            source={require('./sub.png')}
            style={{width: 130, height: 130}}
          />
        </View>

        <Text style={styles.text2}>AVERAGE OF ALL YOUR SUBJECTS</Text>
        <PieChart
          donut
          showText
          textColor="black"
          innerRadius={70}
          showTextBackground
          textBackgroundColor="white"
          textBackgroundRadius={20}
          data={pieData2}
          centerLabelComponent={() => {
            return (
              <Text style={{fontSize: 30}}>
                {Math.round(allSubAvg() * 100) / 100}
              </Text>
            );
          }}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            marginTop: 10,
            marginLeft: 30,
          }}>
          {pieData2.map(val => renderLegend(val.sub, val.color))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 30,
    marginTop: 70,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgview: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    width: '100%',
  },
  text2: {
    marginTop: '10%',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
