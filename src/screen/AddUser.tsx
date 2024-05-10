import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../helper/colors';
import CustomInput from '../components/UI/CustomInput';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../components/UI/CustomButton';
import {rMS} from '../helper/responsive';
import DatePickerUI from '../components/UI/DatePickerUI';
import { Dropdown } from 'react-native-element-dropdown';

function AddUser(): React.JSX.Element {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showDate, setShowDate] = React.useState(false);
  const handleDateChange = (value: Date) => {
    setShowDate(false);
    if (value) {
      setSelectedDate(value);
      const date = new Date(value).toLocaleDateString('en-GB', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
      // handleInputChange('date', date);
      console.log(date, 'date');
    }
  };
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {showDate && (
          <DatePickerUI
            dateValue={selectedDate}
            handleCancelPressed={() => setShowDate(false)}
            handleOkayPressed={(value: Date) => handleDateChange(value)}
          />
        )}
        <Dropdown
          style={[style.dropdown]}
          placeholderStyle={style.placeholderStyle}
          selectedTextStyle={style.selectedTextStyle}
          inputSearchStyle={style.inputSearchStyle}
          iconStyle={style.iconStyle}
          data={data}
          // maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={ 'Select item'}
          // value={value}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          // onChange={item => {
          //   setValue(item.value);
          //   setIsFocus(false);
          // }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
        <View
          style={{
            alignSelf: 'center',
            maxWidth: 600,
            flex: 1,
            flexShrink: 1,
          }}>
          <View style={{marginVertical: rMS(40), alignItems: 'center'}}>
            <Text
              style={{fontSize: 22, fontWeight: '600', color: colors.fontDark}}>
              Add New User
            </Text>
          </View>
          <CustomInput
            textInputConfig={{
              placeholder: 'First Name',
            }}
          />
          <CustomInput textInputConfig={{placeholder: 'Last Name'}} />
          <CustomInput textInputConfig={{placeholder: 'Email'}} />
          <CustomInput textInputConfig={{placeholder: 'Mobile Number'}} />
          <CustomInput textInputConfig={{placeholder: 'Title'}} />
          <CustomInput
            showIcon={true}
            textInputConfig={{placeholder: 'Date of Joining'}}
            iconPressed={() => setShowDate(true)}>
            <Icon name="calendar" size={30} color="black" />
          </CustomInput>
          <CustomInput
            showIcon={true}
            disableInput={true}
            textInputConfig={{value: '', placeholder: 'Upload Img'}}>
            <Icon name="upload" size={30} color="black" />
          </CustomInput>
          <CustomButton>Save</CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddUser;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
