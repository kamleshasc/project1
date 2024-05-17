import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../helper/colors';
import CustomDropdownMultiSelect from '../components/UI/CustomDropdownMultiSelect';
import {RootStackNavigationProp} from '../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 11', value: '7'},
  {label: 'kamlesh', value: '8'},
];

interface servicesProps {
  navigation: RootStackNavigationProp;
}

function Services({navigation}: servicesProps): React.JSX.Element {
  const [selected, setSelected] = React.useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddService')}
          style={{
            height: 40,
            width: 40,
            marginRight: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const onChangeDropdown = (value: any) => {
    setSelected(value);
    console.log(value, 'on changeeee');
  };
  return (
    <SafeAreaView style={style.container}>
      <Text style={{color: colors.fontDark}}>Services</Text>
      <CustomDropdownMultiSelect
        data={data}
        onChange={onChangeDropdown}
        placeholder={'Select Employees'}
        selected={selected}
      />
    </SafeAreaView>
  );
}

export default Services;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
