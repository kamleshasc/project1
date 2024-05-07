import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import colors from '../styles/colors';

function Clients(): React.JSX.Element {

  return (
    <SafeAreaView style={style.container}>
        <Text style={{color:colors.fontDark}}>Clients</Text>
    </SafeAreaView>
  );
}

export default Clients;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    }
})