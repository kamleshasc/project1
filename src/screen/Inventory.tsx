import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import colors from '../helper/colors';

function Inventory(): React.JSX.Element {

  return (
    <SafeAreaView style={style.container}>
        <Text style={{color:colors.fontDark}}>Inventory</Text>
    </SafeAreaView>
  );
}

export default Inventory;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    }
})