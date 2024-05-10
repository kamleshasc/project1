import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {rMS, rS, rV} from '../../helper/responsive';
import colors from '../../helper/colors';

interface TableItemProps {
  name: string;
  ImgUrl?: string;
}

const TableItem: React.FC<TableItemProps> = ({name, ImgUrl}) => {
  return (
    <View style={styles.container}>
      {ImgUrl ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://images.pexels.com/photos/19153153/pexels-photo-19153153/free-photo-of-sea-dawn-landscape-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' ||
                ImgUrl,
            }}
          />
        </View>
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
    width: rS(80),
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: rMS(11),
    fontWeight: '500',
  },
});

export default TableItem;
