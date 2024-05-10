import React from 'react';
import {View, TouchableHighlight, StyleSheet} from 'react-native';

interface TableRowProps {
  onPress: () => void;
  children: React.ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({onPress, children}) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="transparent">
      <View style={styles.container}>{children}</View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderColor: 'grey',
  },
});

export default TableRow;
