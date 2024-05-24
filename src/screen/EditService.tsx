import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../config/colors';
import CustomInput from '../components/UI/CustomInput';
import {rMS} from '../config/responsive';
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

function EditService({}) {
  const [inputs, setInputs] = React.useState({
    service: {
      value: '',
      isValid: true,
      message: '',
    },
    duration: {
      value: [],
      isValid: true,
      message: '',
    },
    branch: {
      value: [],
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
    employees: {
      value: [],
      isValid: true,
      message: '',
    },
  });

  const {service, duration, branch, category, price, site, status, employees} =
    inputs;

  function inputChangedHandler(inputIdentifier: any, enteredValue: any): void {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  }

  function validationCheck() {
    let serviceNameIsvalid = true;
    let serviceNameMsg = '';
    let durationIsvalid = true;
    let durationMsg = '';
    let branchIsvalid = true;
    let branchMsg = '';
    let categoryIsvalid = true;
    let categoryMsg = '';
    let priceIsvalid = true;
    let priceMsg = '';
    let siteIsvalid = true;
    let siteMsg = '';
    let statusIsvalid = true;
    let statusMsg = '';
    let empIsvalid = true;
    let empMsg = '';

    if (service.value.trim().length <= 0) {
      serviceNameIsvalid = false;
      serviceNameMsg = 'Service Name is required.';
    }
    if (duration.value.length <= 0) {
      durationIsvalid = false;
      durationMsg = 'Duration is required.';
    }
    if (branch.value.length <= 0) {
      branchIsvalid = false;
      branchMsg = 'Branch is required.';
    }
    if (category.value.length <= 0) {
      categoryIsvalid = false;
      categoryMsg = 'Category is required.';
    }
    if (price.value.length <= 0) {
      priceIsvalid = false;
      priceMsg = 'Price is required.';
    }
    if (site.value.length <= 0) {
      siteIsvalid = false;
      siteMsg = 'Site is required.';
    }
    if (status.value.length <= 0) {
      statusIsvalid = false;
      statusMsg = 'Status is required.';
    }
    if (employees.value.length <= 0) {
      empIsvalid = false;
      empMsg = 'Assign Employee is required.';
    }
    if (
      !serviceNameIsvalid ||
      !branchIsvalid ||
      !durationIsvalid ||
      !categoryIsvalid ||
      !priceIsvalid ||
      !siteIsvalid ||
      !statusIsvalid ||
      !empIsvalid
    ) {
      setInputs(curInputs => {
        return {
          ...curInputs,
          service: {
            message: serviceNameMsg,
            value: curInputs.service.value,
            isValid: serviceNameIsvalid,
          },
          duration: {
            message: durationMsg,
            value: curInputs.duration.value,
            isValid: durationIsvalid,
          },
          branch: {
            message: serviceNameMsg,
            value: curInputs.branch.value,
            isValid: branchIsvalid,
          },
          category: {
            message: categoryMsg,
            value: curInputs.category.value,
            isValid: categoryIsvalid,
          },
          price: {
            message: priceMsg,
            value: curInputs.price.value,
            isValid: priceIsvalid,
          },
          site: {
            message: siteMsg,
            value: curInputs.site.value,
            isValid: siteIsvalid,
          },
          status: {
            message: statusMsg,
            value: curInputs.status.value,
            isValid: statusIsvalid,
          },
          employees: {
            message: empMsg,
            value: curInputs.employees.value,
            isValid: empIsvalid,
          },
        };
      });
      return;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Edit Service</Text>
          </View>

          <CustomInput
            textInputConfig={{
              placeholder: 'Service Name',
              value: service.value,
              onChangeText: (value: any) =>
                inputChangedHandler('service', value),
            }}
            isError={!service.isValid}
            errorMsg={service.message}
          />

          <CustomDropdownMultiSelect
            data={durationData}
            onChange={(value: any) => inputChangedHandler('duration', value)}
            placeholder={'Select Duration'}
            selected={duration.value}
            isError={!duration.isValid}
            errorMsg={duration.message}
          />

          <CustomDropdownMultiSelect
            data={branchData}
            onChange={(value: any) => inputChangedHandler('branch', value)}
            placeholder={'Select Branch'}
            selected={branch.value}
            isError={!branch.isValid}
            errorMsg={branch.message}
          />

          <CustomDropdown
            data={categoryData}
            placeholder={'Select Category'}
            value={category.value}
            isError={!category.isValid}
            errorMsg={category.message}
            onChange={(value: any) =>
              inputChangedHandler('category', value.value)
            }
          />

          <CustomInput
            textInputConfig={{
              placeholder: 'Price',
              value: price.value,
              keyboardType: 'number-pad',
              onChangeText: (value: any) => inputChangedHandler('price', value),
            }}
            isError={!price.isValid}
            errorMsg={price.message}
          />

          <CustomDropdown
            data={siteData}
            placeholder={'Select Site'}
            value={site.value}
            isError={!site.isValid}
            errorMsg={site.message}
            onChange={(value: any) => inputChangedHandler('site', value.value)}
          />

          <CustomDropdown
            data={statusData}
            placeholder={'Select Status'}
            value={status.value}
            isError={!status.isValid}
            errorMsg={status.message}
            onChange={(value: any) =>
              inputChangedHandler('status', value.value)
            }
          />

          <CustomDropdownMultiSelect
            data={employeeData}
            onChange={(value: any) => inputChangedHandler('employees', value)}
            placeholder={'Select Employee to assign'}
            selected={employees.value}
            isError={!employees.isValid}
            errorMsg={employees.message}
          />

          <View style={styles.btnContainer}>
            <CustomButton onPressBtn={validationCheck}>Save</CustomButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditService;

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
