import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../helper/colors';
import CustomInput from '../components/UI/CustomInput';
import {rMS} from '../helper/responsive';
import CustomDropdown from '../components/UI/CustomDropdown';
import CustomDropdownMultiSelect from '../components/UI/CustomDropdownMultiSelect';
import CustomButton from '../components/UI/CustomButton';

const durationData = [
  {label: '15 min', value: '15 min'},
  {label: '30 min', value: '30 min'},
  {label: '45 min', value: '45 min'},
  {label: '60 min', value: '60 min'},
  {label: '75 min', value: '75 min'},
  {label: '90 min', value: '90 min'},
  {label: '120 min', value: '120 min'},
];

const branchData = [
  {label: 'Ordando', value: 'Ordando'},
  {label: 'Tampa', value: 'Tampa'},
  {label: 'Miami', value: 'Miami'},
];

const siteData = [
  {label: 'On Site', value: 'On Site'},
  {label: 'Off Site', value: 'Off Site'},
];

const statusData = [
  {label: 'Active', value: 'Active'},
  {label: 'InActive', value: 'InActive'},
];

const categoryData = [
  {label: 'Facial', value: 'Facial'},
  {label: 'Massage', value: 'Massage'},
  {label: 'Therapist', value: 'Therapist'},
  {label: 'Body Sculpting', value: 'Body Sculpting'},
];

const employeeData = [
  {label: 'Kamlesh', value: 'Kamlesh'},
  {label: 'Suresh', value: 'Suresh'},
  {label: 'Rakesh', value: 'Rakesh'},
  {label: 'Ravi', value: 'Ravi'},
];

function AddService() {
  const [inputs, setInputs] = React.useState({
    service: {
      value: '',
      isValid: true,
      message: '',
    },
    duration: {
      value: '',
      isValid: true,
      message: '',
    },
    category: {
      value: '',
      isValid: true,
      message: '',
    },
    price: {
      value: '',
      isValid: true,
      message: '',
    },
    site: {
      value: '',
      isValid: true,
      message: '',
    },
    status: {
      value: '',
      isValid: true,
      message: '',
    },
  });
  const [selectedBranch, setSelectedBranch] = React.useState([]);
  const [selectedEmployees, setSelectedEmployees] = React.useState([]);
  const [selectedBranchIsValid, setSelectedBranchIsValid] =
    React.useState(true);
  const [selectedEmployeesIsValid, setselectedEmployeesIsValid] =
    React.useState(true);

  function inputChangedHandler(inputIdentifier: any, enteredValue: any): void {
    try {
      setInputs(curInputs => {
        return {
          ...curInputs,
          [inputIdentifier]: {value: enteredValue, isValid: true},
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeDropdown = (value: any) => {
    console.log(value, 'valuuu');

    setSelectedBranch(value);
  };

  const onChangeBranch = (value: any) => {
    console.log(value, 'valuuu');
    setSelectedEmployees(value);
  };

  function validationCheck() {}

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Add New Service</Text>
          </View>

          <CustomInput
            textInputConfig={{
              placeholder: 'Service Name',
              value: inputs.service.value,
            }}
            isError={!inputs.service.isValid}
            errorMsg={inputs.service.message}
          />

          <CustomDropdown
            data={durationData}
            placeholder={'Select Duration'}
            value={inputs.duration.value}
            isError={!inputs.duration.isValid}
            errorMsg={inputs.duration.message}
            onChange={value => inputChangedHandler('duration', value.value)}
          />

          <CustomDropdownMultiSelect
            data={categoryData}
            onChange={onChangeBranch}
            placeholder={'Select Branch'}
            selected={selectedBranch}
          />

          <CustomDropdown
            data={branchData}
            placeholder={'Select Category'}
            value={inputs.category.value}
            isError={!inputs.category.isValid}
            errorMsg={inputs.category.message}
            onChange={value => inputChangedHandler('category', value.value)}
          />

          <CustomInput
            textInputConfig={{
              placeholder: 'Price',
              value: inputs.price.value,
            }}
            isError={!inputs.price.isValid}
            errorMsg={inputs.price.message}
          />

          <CustomDropdown
            data={siteData}
            placeholder={'Select Site'}
            value={inputs.site.value}
            isError={!inputs.site.isValid}
            errorMsg={inputs.site.message}
            onChange={value => inputChangedHandler('site', value.value)}
          />

          <CustomDropdown
            data={statusData}
            placeholder={'Select Status'}
            value={inputs.status.value}
            isError={!inputs.status.isValid}
            errorMsg={inputs.status.message}
            onChange={value => inputChangedHandler('status', value.value)}
          />

          <CustomDropdownMultiSelect
            data={employeeData}
            onChange={onChangeDropdown}
            placeholder={'Select Employee to assign'}
            selected={selectedEmployees}
          />

          <View style={styles.btnContainer}>
            <CustomButton onPressBtn={() => {}}>Add</CustomButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  subContainer: {
    maxWidth: 600,
    alignSelf: 'center',
    flex: 1,
  },
  btnContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  headerContainer: {
    marginVertical: rMS(40),
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.fontDark,
  },
});
