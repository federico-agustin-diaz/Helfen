import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import AuthNavigator from './AuthNavigator';
import {LogBox} from 'react-native';
import MainBottomTab from './MainBottomTab';
import FindNavigator from './FindNavigator';
import MessagesNavigator from './MessagesNavigator';
import RequestNavigator from './RequestNavigator';
import AddMorePayment from 'src/more/AddMorePayment/AddMorePayment';
import ChangeJobType from 'src/more/ChangJobType';
import Onboarding from 'src/onboarding';
import SuccessScr from 'src/SuccessScr';
import HomeAddress from 'src/more/HomeAddress';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator<RootStackParamList>();
const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Intro">
        <Stack.Screen name="Intro" component={Onboarding} />
        <Stack.Screen name="AuthStack" component={AuthNavigator} />
        <Stack.Screen name="FindStack" component={FindNavigator} />
        <Stack.Screen name="RequestStack" component={RequestNavigator} />
        <Stack.Screen name="MessagesStack" component={MessagesNavigator} />
        <Stack.Screen name="MainBottomTab" component={MainBottomTab} />
        <Stack.Screen name="HomeAddress" component={HomeAddress} />
        <Stack.Screen name="AddMorePayment" component={AddMorePayment} />
        <Stack.Screen name="ChangeJobType" component={ChangeJobType} />
        <Stack.Screen name="SuccessScr" component={SuccessScr} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppContainer;
