import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import colors from '../../config/colors';

function EditInvoice() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
      <Text>Edit Invoice</Text>
    </SafeAreaView>
  );
}

export default EditInvoice;
