import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {rMS, rS} from '../../config/responsive';
import colors from '../../config/colors';

interface TableHeaderProps {
  headers: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({headers}) => {
  return (
    <View style={styles.container}>
      {headers.map((header, index) => (
        <View key={index} style={styles.header}>
          <Text style={styles.headerText}>{header}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },
  header: {
    width: rS(81),
    paddingVertical: rMS(8),
    paddingHorizontal: rMS(4),
    minHeight: 60,
    justifyContent:'center'
  },
  headerText: {
    fontSize: rMS(13),
    color: colors.fontDark,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default TableHeader;
