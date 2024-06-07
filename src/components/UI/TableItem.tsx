import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {rMS, rS} from '../../config/responsive';
import colors from '../../config/colors';

interface TableItemProps {
  name?: string;
  ImgUrl?: string;
  bunchData?: any[];
}

const TableItem: React.FC<TableItemProps> = ({name, ImgUrl, bunchData}) => {
  return (
    <View style={styles.container}>
      {ImgUrl ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `http://192.168.1.69:3200/images/${ImgUrl}`,
            }}
          />
        </View>
      ) : bunchData && bunchData.length > 0 ? (
        <Text style={styles.text}>{bunchData.toString()}</Text>
      ) : (
        <Text style={styles.text}>{name}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: rMS(6),
    paddingHorizontal: rMS(2),
    backgroundColor: colors.primary,
    width: rS(81),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  imageContainer: {
    height: 50,
    width: 55,
    backgroundColor: 'gray',
    borderRadius: 40,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    color: '#000',
    fontSize: rMS(12),
    fontWeight: '500',
  },
});

export default TableItem;
