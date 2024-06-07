import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {rMS} from '../../config/responsive';
import {UI} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchGetUser} from '../../redux/Action/userAction';
import {RootState} from '../../redux/store';
import {fetchAddService, fetchService} from '../../redux/Action/serviceAction';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {
  branchData,
  categoryData,
  durationData,
  siteData,
  statusData,
} from '../../config/data';

export interface singleObjString {
  value: string;
  isValid: boolean;
  message: string;
}
export interface singleObjNumber {
  value: any;
  isValid: boolean;
  message: string;
}
export interface arrayString {
  value: string[];
  isValid: boolean;
  message: string;
}
export interface serviceInput {
  serviceName: singleObjString;
  duration: singleObjString;
  category: singleObjString;
  price: singleObjNumber;
  onsiteOffsite: singleObjString;
  selectedBranches: arrayString;
  selectedUsers: arrayString;
  status: singleObjString;
}

export const initialInputs: serviceInput = {
  serviceName: {value: '', isValid: true, message: ''},
  duration: {value: '', isValid: true, message: ''},
  category: {value: '', isValid: true, message: ''},
  price: {value: '', isValid: true, message: ''},
  onsiteOffsite: {value: '', isValid: true, message: ''},
  selectedBranches: {value: [], isValid: true, message: ''},
  selectedUsers: {value: [], isValid: true, message: ''},
  status: {value: '', isValid: true, message: ''},
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddService'>;

function AddService({navigation}: Props) {
  const [inputs, setInputs] = React.useState<serviceInput>(initialInputs);
  const {
    serviceName,
    duration,
    selectedBranches,
    category,
    price,
    onsiteOffsite,
    status,
    selectedUsers,
  } = inputs;
  const addServiceDispatch = useAppDispatch();
  const {data} = useAppSelector((state: RootState) => state.user.getUser);
  const {isLoader, isError, errorMsg} = useAppSelector(
    (state: RootState) => state.service.addService,
  );
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  let numbers = /^\d+$/;

  function inputChangedHandler(inputIdentifier: any, enteredValue: any): void {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  }

  const submitService = async () => {
    try {
      let payload = {
        serviceName: serviceName.value,
        duration: duration.value,
        category: category.value,
        price: Number(price.value),
        onsiteOffsite: onsiteOffsite.value,
        selectedBranches: selectedBranches.value,
        selectedUsers: selectedUsers.value,
        status: status.value,
      };
      await addServiceDispatch(fetchAddService(payload)).unwrap();
      addServiceDispatch(fetchService());
      navigation.goBack();
    } catch (error) {
      setError(true);
      setErrorMessage(error);
    }
  };

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

    if (serviceName.value.trim().length <= 0) {
      serviceNameIsvalid = false;
      serviceNameMsg = 'Service Name is required.';
    }
    if (duration.value.length <= 0) {
      durationIsvalid = false;
      durationMsg = 'Duration is required.';
    }
    if (selectedBranches.value.length <= 0) {
      branchIsvalid = false;
      branchMsg = 'Branch is required.';
    }
    if (category.value.length <= 0) {
      categoryIsvalid = false;
      categoryMsg = 'Category is required.';
    }
    if (price.value < 0) {
      priceIsvalid = false;
      priceMsg = 'Price is required.';
    } else if (!numbers.test(price.value)) {
      priceIsvalid = false;
      priceMsg = 'Enter numbers only.';
    }
    if (onsiteOffsite.value.length <= 0) {
      siteIsvalid = false;
      siteMsg = 'Site is required.';
    }
    if (status.value.length <= 0) {
      statusIsvalid = false;
      statusMsg = 'Status is required.';
    }
    if (selectedUsers.value.length <= 0) {
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
          serviceName: {
            message: serviceNameMsg,
            value: curInputs.serviceName.value,
            isValid: serviceNameIsvalid,
          },
          duration: {
            message: durationMsg,
            value: curInputs.duration.value,
            isValid: durationIsvalid,
          },
          selectedBranches: {
            message: branchMsg,
            value: curInputs.selectedBranches.value,
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
          onsiteOffsite: {
            message: siteMsg,
            value: curInputs.onsiteOffsite.value,
            isValid: siteIsvalid,
          },
          status: {
            message: statusMsg,
            value: curInputs.status.value,
            isValid: statusIsvalid,
          },
          selectedUsers: {
            message: empMsg,
            value: curInputs.selectedUsers.value,
            isValid: empIsvalid,
          },
        };
      });
      return;
    }
    submitService();
  }

  const getAssignEmployeeDetails = () => {
    addServiceDispatch(fetchGetUser());
  };

  React.useEffect(() => {
    getAssignEmployeeDetails();
  }, []);

  React.useEffect(() => {
    if (!isLoader && isError) {
      setError(isError);
      setErrorMessage(errorMsg);
    }
  }, [isLoader]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Add New Service</Text>
          </View>

          <UI.Input
            textInputConfig={{
              placeholder: 'Service Name',
              value: serviceName.value,
              onChangeText: (value: any) =>
                inputChangedHandler('serviceName', value),
            }}
            isError={!serviceName.isValid}
            errorMsg={serviceName.message}
          />

          <UI.DropDown
            data={durationData}
            onChange={(value: any) =>
              inputChangedHandler('duration', value.value)
            }
            placeholder={'Select Duration'}
            value={duration.value}
            isError={!duration.isValid}
            errorMsg={duration.message}
          />

          <UI.DropDownMultiSelect
            data={branchData}
            onChange={(value: any) =>
              inputChangedHandler('selectedBranches', value)
            }
            placeholder={'Select Branch'}
            selected={selectedBranches.value}
            isError={!selectedBranches.isValid}
            errorMsg={selectedBranches.message}
          />

          <UI.DropDown
            data={categoryData}
            placeholder={'Select Category'}
            value={category.value}
            isError={!category.isValid}
            errorMsg={category.message}
            onChange={(value: any) =>
              inputChangedHandler('category', value.value)
            }
          />

          <UI.Input
            textInputConfig={{
              placeholder: 'Price',
              value: price.value,
              keyboardType: 'number-pad',
              onChangeText: (value: any) => inputChangedHandler('price', value),
            }}
            isError={!price.isValid}
            errorMsg={price.message}
          />

          <UI.DropDown
            data={siteData}
            placeholder={'Select Site'}
            value={onsiteOffsite.value}
            isError={!onsiteOffsite.isValid}
            errorMsg={onsiteOffsite.message}
            onChange={value =>
              inputChangedHandler('onsiteOffsite', value.value)
            }
          />

          <UI.DropDownMultiSelect
            data={data.map(value => {
              return {
                label: value.firstName + ' ' + value.lastName,
                value: value.firstName + ' ' + value.lastName,
              };
            })}
            onChange={(value: any) =>
              inputChangedHandler('selectedUsers', value)
            }
            placeholder={'Select Employee to assign'}
            selected={selectedUsers.value}
            isError={!selectedUsers.isValid}
            errorMsg={selectedUsers.message}
          />
          <UI.DropDown
            data={statusData}
            placeholder={'Select Status'}
            value={status.value}
            isError={!status.isValid}
            errorMsg={status.message}
            onChange={value => inputChangedHandler('status', value.value)}
          />

          <View style={styles.btnContainer}>
            <UI.Btn disabledBtn={isLoader} onPressBtn={validationCheck}>
              Add
            </UI.Btn>
          </View>
        </View>
      </ScrollView>
      <UI.Toast
        visible={error}
        message={errorMessage}
        onDismissSnackBar={() => setError(false)}
      />
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
