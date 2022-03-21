import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Button,
  Linking,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const [Items, setItems] = useState([
    {key: 1, item: 'Item1'},
    {key: 2, item: 'Item2'},
    {key: 3, item: 'Item3'},
    {key: 4, item: 'Item4'},
    {key: 5, item: 'Item5'},
    {key: 6, item: 'Item6'},
    {key: 7, item: 'Item7'},
    {key: 8, item: 'Item8'},
    {key: 9, item: 'Item9'},
    {key: 10, item: 'Item10'},
    {key: 11, item: 'Item11'},
  ]);

  const [Refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setItems([...Items, {key: 69, item: 'Item69'}]);
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.body}
      refreshControl={<RefreshControl refreshing={Refreshing} onRefresh={onRefresh} />}>
      {Items.map(object => {
        return (
          <View style={styles.item} key={object.key}>
            <Text style={styles.text}>{object.item}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    flexDirection: 'column',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    fontStyle: 'italic',
    margin: 10,
  },
  item: {
    backgroundColor: '#338149',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#FF0',
  },
});

export default App;
