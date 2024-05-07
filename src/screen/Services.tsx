import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import colors from '../styles/colors';

function Services(): React.JSX.Element {

  return (
    <SafeAreaView style={style.container}>
        <Text style={{color:colors.fontDark}}>Services</Text>
    </SafeAreaView>
  );
}

export default Services;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    }
})