import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import AddUser from '../screen/AddUser';
import EditUser from '../screen/EditUser';
import colors from '../helper/colors';

export type RootStackParamList = {
  DrawerNavigation: undefined;
  AddUser: undefined;
  EditUser: undefined;
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
        component={AddUser}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUser}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export default RootNavigation;
