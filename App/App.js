import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import GradesScreen from './Screens/GradesScreen';
import AddScreen from './Screens/AddScreen';
import HomeScreen from './Screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'GradesScreen') {
              iconName = 'table';
              size = focused ? 25 : 20;
              color = focused ? '#cc1010' : '#494949';
            } else if (route.name === 'AddScreen') {
              iconName = 'list';
              size = focused ? 25 : 20;
              color = focused ? '#cc1010' : '#494949';
            } else if (route.name === 'HomeScreen') {
              iconName = 'home';
              size = focused ? 25 : 20;
              color = focused ? '#cc1010' : '#494949';
            }
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name={'GradesScreen'} component={GradesScreen} />
        <Tab.Screen name={'AddScreen'} component={AddScreen} />
        <Tab.Screen name={'HomeScreen'} component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
