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
import {ClientsData} from '../screens/Client/Clients';
import {InventoryData} from '../screens/Inventory/Inventory';
import {commissionRuleData} from '../screens/CommissionRule/CommissionRules';

export type RootStackParamList = {
  DrawerNavigation: undefined;
  AddUser: undefined;
  EditUser: {user: UserData};
  AddService: undefined;
  EditService: {service: ServiceData};
  AddClient: undefined;
  EditClient: {client: ClientsData};
  AddInventory: undefined;
  EditInventory: {inventory: InventoryData};
  AddCommissionRule: undefined;
  EditCommissionRule: {commissionRule: commissionRuleData};
  AddInvoice: undefined;
  EditInvoice: undefined;
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
      <Stack.Screen
        name="AddClient"
        component={SCREENS.CLIENT.addClient}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditClient"
        component={SCREENS.CLIENT.editClient}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddInventory"
        component={SCREENS.INVENTORY.addInventory}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditInventory"
        component={SCREENS.INVENTORY.editInventory}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddCommissionRule"
        component={SCREENS.COMMISSIONRULESCREENS.addCommissionRule}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditCommissionRule"
        component={SCREENS.COMMISSIONRULESCREENS.editCommissionRule}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddInvoice"
        component={SCREENS.INVOICESCREENS.addInvoice}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditInvoice"
        component={SCREENS.INVOICESCREENS.editInvoice}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export default RootNavigation;
