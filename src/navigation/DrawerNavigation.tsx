import React from 'react';
import {
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import colors from '../config/colors';
import SCREENS from '../screens';

export type DrawerNavigationParamList = {
  Dashboard: undefined;
  Users: undefined;
  Services: undefined;
  Packages: undefined;
  Clients: undefined;
  Price: undefined;
  Inventory: undefined;
};

export type DrawerNavigationPropList =
  DrawerNavigationProp<DrawerNavigationParamList>;

const Drawer = createDrawerNavigator<DrawerNavigationParamList>();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondaryDark,
        },
        headerTitleStyle: {
          color: colors.fontLight,
        },
        headerTintColor: colors.primary,
      }}>
      <Drawer.Screen name="Dashboard" component={SCREENS.DASHBOARD.dashboard} />
      <Drawer.Screen name="Users" component={SCREENS.USER.users} />
      <Drawer.Screen name="Services" component={SCREENS.SERVICE.services} />
      <Drawer.Screen name="Packages" component={SCREENS.PACKAGE.packages} />
      <Drawer.Screen name="Clients" component={SCREENS.CLIENT.clients} />
      <Drawer.Screen name="Price" component={SCREENS.PRICE.prices} />
      <Drawer.Screen
        name="Inventory"
        component={SCREENS.INVENTORY.inventorys}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
