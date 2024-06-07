import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import colors from '../config/colors';
import {UserData} from '../screens/User/Users';
import {ServiceData} from '../screens/Service/Services';
import SCREENS from '../screens';

export type RootStackParamList = {
  DrawerNavigation: undefined;
  AddUser: undefined;
  EditUser: {user: UserData};
  AddService: undefined;
  EditService: {service: ServiceData};
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.secondaryDark,
        },
        headerTitleStyle: {
          color: colors.fontLight,
        },
        headerTintColor: colors.primary,
      }}>
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      <Stack.Screen
        name="AddUser"
        component={SCREENS.USER.addUser}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditUser"
        component={SCREENS.USER.editUser}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddService"
        component={SCREENS.SERVICE.addService}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditService"
        component={SCREENS.SERVICE.editService}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export default RootNavigation;
