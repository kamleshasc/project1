import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import colors from '../../helper/colors';
import {View} from 'react-native';
import {HelperText} from 'react-native-paper';
interface Option {
  label: string;
  value: string;
}

interface Props {
  data: Option[];
  value: string;
  onChange: (value: any) => void;
  placeholder: string;
  isError: boolean;
  errorMsg: string;
}

const CustomDropdown: React.FC<Props> = ({
  data,
  value,
  onChange,
  placeholder,
  isError,
  errorMsg,
}) => {
  const renderItem = (item: {label: any}) => {
    return (
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 15,
          borderBottomColor: colors.secondaryDark,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 0.5,
        }}>
        <Text style={{fontSize: 14, color: colors.fontDark}}>{item.label}</Text>
      </View>
    );
  };
  return (
    <>
      <View>
        <Dropdown
          style={[style.dropdown]}
          placeholderStyle={style.placeholderStyle}
          selectedTextStyle={style.selectedTextStyle}
          iconStyle={style.iconStyle}
          data={data}
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          iconColor="black"
          renderItem={renderItem}
        />
      </View>
      {isError && (
        <View style={style.error}>
          <HelperText type="error" visible={true}>
            {errorMsg}
          </HelperText>
        </View>
      )}
    </>
  );
};

export default CustomDropdown;

const style = StyleSheet.create({
  dropdown: {
    paddingRight: 8,
    paddingLeft: 14,
    borderWidth: 1.5,
    borderColor: colors.secondaryDark,
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 0,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
  // inputSearchStyle: {
  //   height: 40,
  //   fontSize: 16,
  // },
  error: {
    marginTop: -20,
    marginLeft: 16,
  },
});
