import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../helper/colors';
import {HelperText} from 'react-native-paper';

interface Option {
  label: string;
  value: string;
}

interface Props {
  data: Option[];
  selected: string[];
  placeholder: string;
  onChange: (selected: any[]) => void;
}

const CustomDropdownMultiSelect: React.FC<Props> = ({
  data,
  selected,
  placeholder,
  onChange,
}) => {
  const renderItem = (item: {label: any}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <MultiSelect
          style={styles.dropdown}
          iconColor="black"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={selected}
          maxHeight={150}
          onChange={onChange}
          renderItem={renderItem}
          renderSelectedItem={(item, unSelect) => {
            return (
              <TouchableOpacity
                style={styles.renderContainer}
                onPress={() => unSelect && unSelect(item)}>
                <View style={styles.selectedStyle}>
                  <Text style={styles.textSelectedStyle}>{item.label}</Text>
                  <Icon color="black" name="delete" size={17} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {true && (
        <View style={{marginTop: -20, marginLeft: 16}}>
          <HelperText type="error" visible={true}>
            {'heelelelel'}
          </HelperText>
        </View>
      )}
    </>
  );
};

export default CustomDropdownMultiSelect;

const styles = StyleSheet.create({
  container: {padding: 0, marginHorizontal: 20, marginBottom: 20},
  dropdown: {
    borderWidth: 1.5,
    borderColor: colors.secondaryDark,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 10,
    paddingLeft: 14,
    paddingRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: colors.fontDark,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    // padding: 17,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomColor: colors.secondaryDark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSelectedStyle: {
    backgroundColor: 'white',
    marginRight: 5,
    fontSize: 16,
  },
  renderContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 14,
    // marginBottom: 20,
  },
});
