import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';

type InvoiceType = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'Invoices'>,
  StackScreenProps<RootStackParamList>
>;

function Invoice({navigation}: InvoiceType) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddInvoice')}
          style={style.iconContainer}>
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView style={style.container}>
      <Text> Invoice</Text>
    </SafeAreaView>
  );
}

export default Invoice;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fullScreen: {
    flex: 1,
  },
  iconContainer: {
    height: 40,
    width: 40,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
