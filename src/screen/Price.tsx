import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import colors from '../styles/colors';

function Price(): React.JSX.Element {

  return (
    <SafeAreaView style={style.container}>
        <Text style={{color:colors.fontDark}}>Price</Text>
    </SafeAreaView>
  );
}

export default Price;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    }
})