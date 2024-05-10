import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import colors from '../helper/colors';

function Dashboard(): React.JSX.Element {

  return (
    <SafeAreaView style={style.container}>
        <Text style={{color:colors.fontDark}}>Dashboard</Text>
    </SafeAreaView>
  );
}

export default Dashboard;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    }
})