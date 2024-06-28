import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import colors from '../../../config/colors';
import Icon from 'react-native-vector-icons/AntDesign';
type Service = {
  _id: string;
  serviceName: string;
  duration: string;
  price: number;
};

type DataItem = {
  label: string;
  value: string;
};

type DropDownWithItemListProps = {
  addValue: (value: string) => void;
  selectedServices: Service[];
  data: DataItem[];
  deleteItem: (index: number) => void;
};

function DropDownWithItemList({
  addValue,
  selectedServices,
  data,
  deleteItem,
}: DropDownWithItemListProps) {
  const [dropDownValue, setDropDownValue] = React.useState<string>('');
  const renderItem = (item: DataItem) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemFont}>{item.label}</Text>
      </View>
    );
  };

  const SelectedDropDownList = ({
    serviceValue,
    selectedIndex,
  }: {
    serviceValue: Service;
    selectedIndex: number;
  }) => {
    return (
      <View style={styles.tableListContainer}>
        <View style={styles.tableListSubContainer}>
          <View style={styles.tableItemContainer}>
            <View style={styles.tableItemSubContainer}>
              <Text style={styles.tableItemQuestionText}>Service:</Text>
              <Text style={styles.tableItemValueText} numberOfLines={2}>
                {serviceValue?.serviceName}
              </Text>
            </View>
            <View style={styles.tableItemQuestionSecondType}>
              <Text style={styles.tableItemQuestionText}>Duration:</Text>
              <Text style={styles.tableItemValueText} numberOfLines={1}>
                {serviceValue?.duration}
              </Text>
            </View>
            <View style={styles.tableItemQuestionSecondType}>
              <Text style={styles.tableItemQuestionText}>Price:</Text>
              <Text style={styles.tableItemValueText} numberOfLines={1}>
                {serviceValue?.price.toFixed(2)}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => deleteItem(selectedIndex)}>
            <Icon name="delete" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onChangeValue = (item: DataItem) => {
    setDropDownValue(item.value);
  };

  const onAddPress = () => {
    if (dropDownValue) {
      addValue(dropDownValue);
      setDropDownValue('');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder={'Select'}
          value={dropDownValue}
          onChange={onChangeValue}
          iconColor="black"
          renderItem={renderItem}
        />
        <View style={{flex: 0.2}}>
          <TouchableOpacity style={styles.btnContainer} onPress={onAddPress}>
            <Text style={styles.btnText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
      {selectedServices &&
        selectedServices?.length > 0 &&
        selectedServices.map((value, _index) => (
          <SelectedDropDownList
            serviceValue={value}
            selectedIndex={_index}
            key={_index}
          />
        ))}
    </>
  );
}

export default DropDownWithItemList;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 22,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dropdown: {
    paddingRight: 8,
    paddingLeft: 14,
    borderWidth: 1.5,
    borderColor: colors.secondaryDark,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 10,
    flex: 0.7,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.fontDark,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomColor: colors.secondaryDark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  itemFont: {
    fontSize: 14,
    color: colors.fontDark,
  },
  btnContainer: {
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: colors.secondaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: colors.fontLight,
  },
  tableListContainer: {
    marginBottom: 20,
    marginHorizontal: 22,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    padding: 10,
    flex: 1,
  },
  tableListSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableItemContainer: {
    width: '85%',
  },
  tableItemSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  tableItemQuestionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.fontDark,
    marginRight: 2,
  },
  tableItemValueText: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.fontDark,
  },
  tableItemQuestionSecondType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
