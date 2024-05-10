import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import colors from '../helper/colors';

function EditUser(): React.JSX.Element {
  return (
    <SafeAreaView style={style.container}>
      <Text style={{color: colors.fontDark}}>EditUser</Text>
    </SafeAreaView>
  );
}

export default EditUser;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});