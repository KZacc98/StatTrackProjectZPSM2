import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SubjectsScreen from './SubjectsScreen';
import GradesScreen from './GradesScreen';
import NewSubjectScreen from './NewSubjectScreen';
import {createStackNavigator} from '@react-navigation/stack';
import NewGradeScreen from './NewGradeScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function AllSubjectsScreen() {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Subjects" component={SubjectsScreen} />
        <RootStack.Screen name="Grades" component={GradesScreen} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{presentation: 'modal'}}>
        <RootStack.Screen name="NewSubject" component={NewSubjectScreen} />
        <RootStack.Screen name="NewGrade" component={NewGradeScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{showIcon: true}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: tabInfo => <Icon name="home" size={24} color="red" />,
          }}
        />
        <Tab.Screen
          name="AllSubjects"
          component={AllSubjectsScreen}
          options={{
            headerShown: false,
            tabBarIcon: tabInfo => (
              <Icon name="school-outline" size={24} color="red" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
