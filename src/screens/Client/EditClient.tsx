import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {rMS} from '../../config/responsive';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {clientInput, initialInputs} from './AddClient';
import {fetchGetUser} from '../../redux/Action/userAction';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {deformatMobileNumber, formatMobileNumber} from '../../config/helper';
import {fetchClient, fetchUpdateClient} from '../../redux/Action/clientAction';

const prefixData = [
  {
    label: 'Mr.',
    value: 'Mr.',
  },
  {
    label: 'Mrs.',
    value: 'Mrs.',
  },
  {
    label: 'Ms.',
    value: 'Ms.',
  },
  {
    label: 'Dr.',
    value: 'Dr.',
  },
];

type EditProps = NativeStackScreenProps<RootStackParamList, 'EditClient'>;

function EditClient({navigation, route}: EditProps) {
  const clientDetails = route.params.client;
  const [inputs, setInputs] = React.useState<clientInput>(initialInputs);
  const dispatchEditClient = useAppDispatch();
  const {data: userdata, isLoader: userLoader} = useAppSelector(
    state => state.user.getUser,
  );
  const {errorMsg, isError, isLoader} = useAppSelector(
    state => state.client.addClient,
  );
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');

  const {
    firstName,
    lastName,
    mobileNumber,
    email,
    addressLineOne,
    addressLineTwo,
    country,
    state,
    city,
    prefix,
    owner,
  } = inputs;
  const reg =
    /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|international|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  let numbers = /^\d+$/;
  let fieldKeys = [
    'firstName',
    'lastName',
    'mobileNumber',
    'email',
    'addressLineOne',
    'addressLineTwo',
    'country',
    'state',
    'city',
    'prefix',
    'owner',
  ];

  const inputChangedHandler = (inputIdentifier: any, enteredValue: any) => {
    try {
      setInputs(currInputs => {
        return {
          ...currInputs,
          [inputIdentifier]: {value: enteredValue, isValid: true},
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editedClientDetails = async () => {
    try {
      let clientId = clientDetails._id;
      let payload = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        mobileNumber: deformatMobileNumber(mobileNumber.value),
        addressLineOne: addressLineOne.value,
        addressLineTwo: addressLineTwo.value,
        country: country.value,
        state: state.value,
        city: city.value,
        prefix: prefix.value,
        owner: owner.value,
      };
      const result = await dispatchEditClient(
        fetchUpdateClient({clientId, payload}),
      ).unwrap();
      if (result) {
        dispatchEditClient(fetchClient());
        navigation.goBack();
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error);
    }
  };

  function validationCheck() {
    let firstNameIsvalid = true;
    let firstNameMsg = '';
    let lastNameIsvalid = true;
    let lastNameMsg = '';
    let mobileNumberIsvalid = true;
    let mobileNumberMsg = '';
    let emailIsvalid = true;
    let emailMsg = '';
    let addressLineOneIsvalid = true;
    let addressLineOneMsg = '';
    let addressLineTwoIsvalid = true;
    let addressLineTwoMsg = '';
    let countryIsvalid = true;
    let countryMsg = '';
    let stateIsvalid = true;
    let stateMsg = '';
    let cityIsvalid = true;
    let cityMsg = '';
    let prefixIsvalid = true;
    let prefixMsg = '';
    let ownerIsvalid = true;
    let ownerMsg = '';

    if (firstName.value.trim().length <= 0) {
      firstNameIsvalid = false;
      firstNameMsg = 'First Name is required.';
    }
    if (lastName.value.trim().length <= 0) {
      lastNameIsvalid = false;
      lastNameMsg = 'Last Name is required.';
    }
    if (
      mobileNumber.value.trim().length > 0 &&
      !numbers.test(mobileNumber.value)
    ) {
      mobileNumberMsg = 'Mobile Number is invalid.';
      mobileNumberIsvalid = false;
    } else if (mobileNumber.value.trim().length <= 0) {
      mobileNumberMsg = 'Mobile Number is required.';
      mobileNumberIsvalid = false;
    } else if (mobileNumber.value.trim().length < 10) {
      mobileNumberMsg = 'Mobile Number must have 10 digits.';
      mobileNumberIsvalid = false;
    }

    if (email.value.length <= 0) {
      emailIsvalid = false;
      emailMsg = 'Email is required.';
    } else if (email.value.trim().length > 0 && !reg.test(email.value)) {
      emailIsvalid = false;
      emailMsg = 'Invalid Email.';
    }
    if (addressLineOne.value.length <= 0) {
      addressLineOneIsvalid = false;
      addressLineOneMsg = 'AddressLineOne is required.';
    }
    if (addressLineTwo.value.length <= 0) {
      addressLineTwoIsvalid = false;
      addressLineTwoMsg = 'AddressLineTwo is required.';
    }
    if (country.value.length <= 0) {
      countryIsvalid = false;
      countryMsg = 'Country is required.';
    }
    if (state.value.length <= 0) {
      stateIsvalid = false;
      stateMsg = 'State is required.';
    }
    if (city.value.length <= 0) {
      cityIsvalid = false;
      cityMsg = 'City is required.';
    }
    if (prefix.value.length <= 0) {
      prefixIsvalid = false;
      prefixMsg = 'Prefix is required.';
    }
    if (owner.value.length <= 0) {
      ownerIsvalid = false;
      ownerMsg = 'Owner is required.';
    }
    if (
      !firstNameIsvalid ||
      !lastNameIsvalid ||
      !mobileNumberIsvalid ||
      !emailIsvalid ||
      !addressLineOneIsvalid ||
      !addressLineTwoIsvalid ||
      !countryIsvalid ||
      !stateIsvalid ||
      !cityIsvalid ||
      !prefixIsvalid ||
      !ownerIsvalid
    ) {
      setInputs(curInputs => {
        return {
          ...curInputs,
          firstName: {
            message: firstNameMsg,
            value: curInputs.firstName.value,
            isValid: firstNameIsvalid,
          },
          lastName: {
            message: lastNameMsg,
            value: curInputs.lastName.value,
            isValid: lastNameIsvalid,
          },
          mobileNumber: {
            message: mobileNumberMsg,
            value: curInputs.mobileNumber.value,
            isValid: mobileNumberIsvalid,
          },
          email: {
            message: emailMsg,
            value: curInputs.email.value,
            isValid: emailIsvalid,
          },
          addressLineOne: {
            message: addressLineOneMsg,
            value: curInputs.addressLineOne.value,
            isValid: addressLineOneIsvalid,
          },
          addressLineTwo: {
            message: addressLineTwoMsg,
            value: curInputs.addressLineTwo.value,
            isValid: addressLineTwoIsvalid,
          },
          country: {
            message: countryMsg,
            value: curInputs.country.value,
            isValid: countryIsvalid,
          },
          state: {
            message: stateMsg,
            value: curInputs.state.value,
            isValid: stateIsvalid,
          },
          city: {
            message: cityMsg,
            value: curInputs.city.value,
            isValid: cityIsvalid,
          },
          prefix: {
            message: prefixMsg,
            value: curInputs.prefix.value,
            isValid: prefixIsvalid,
          },
          owner: {
            message: ownerMsg,
            value: curInputs.owner.value,
            isValid: ownerIsvalid,
          },
        };
      });
      return;
    }
    editedClientDetails();
  }

  const addFieldsDetails = (client: any) => {
    let keys = Object.keys(client).filter(
      value => fieldKeys.indexOf(value) > -1,
    );
    for (let key of keys) {
      if (key == 'mobileNumber') {
        inputChangedHandler(key, formatMobileNumber(client[key]));
      } else if (key == 'owner') {
        inputChangedHandler('owner', client[key]._id);
      } else {
        inputChangedHandler(key, client[key] || '');
      }
    }
  };

  React.useEffect(() => {
    dispatchEditClient(fetchGetUser());
    addFieldsDetails(clientDetails);
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
            <Text style={styles.headerText}>Edit Client</Text>
          </View>
          <UI.Input
            textInputConfig={{
              placeholder: 'First Name',
              value: firstName.value,
              onChangeText: (value: any) =>
                inputChangedHandler('firstName', value),
            }}
            isError={!firstName.isValid}
            errorMsg={firstName.message}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'Last Name',
              value: lastName.value,
              onChangeText: (value: any) =>
                inputChangedHandler('lastName', value),
            }}
            isError={!lastName.isValid}
            errorMsg={lastName.message}
          />
          <UI.DropDown
            data={prefixData}
            placeholder={'Select Prefix'}
            value={prefix.value}
            isError={!prefix.isValid}
            errorMsg={prefix.message}
            onChange={value => inputChangedHandler('prefix', value.value)}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'Email',
              value: email.value,
              onChangeText: (value: any) => inputChangedHandler('email', value),
            }}
            isError={!email.isValid}
            errorMsg={email.message}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'Mobile',
              value: mobileNumber.value,
              keyboardType: 'number-pad',
              onChangeText: (value: any) =>
                inputChangedHandler('mobileNumber', value),
            }}
            isError={!mobileNumber.isValid}
            errorMsg={mobileNumber.message}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'Address Line 1',
              value: addressLineOne.value,
              onChangeText: (value: any) =>
                inputChangedHandler('addressLineOne', value),
            }}
            isError={!addressLineOne.isValid}
            errorMsg={addressLineOne.message}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'Address Line 2',
              value: addressLineTwo.value,
              onChangeText: (value: any) =>
                inputChangedHandler('addressLineTwo', value),
            }}
            isError={!addressLineTwo.isValid}
            errorMsg={addressLineTwo.message}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'Country',
              value: country.value,
              onChangeText: (value: any) =>
                inputChangedHandler('country', value),
            }}
            isError={!country.isValid}
            errorMsg={country.message}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'State',
              value: state.value,
              onChangeText: (value: any) => inputChangedHandler('state', value),
            }}
            isError={!state.isValid}
            errorMsg={state.message}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'City',
              value: city.value,
              onChangeText: (value: any) => inputChangedHandler('city', value),
            }}
            isError={!city.isValid}
            errorMsg={city.message}
          />
          <UI.DropDown
            data={userdata.map(value => {
              return {
                label: value.firstName + ' ' + value.lastName,
                value: value._id,
              };
            })}
            placeholder={'Select Owner'}
            value={owner.value}
            isError={!owner.isValid}
            errorMsg={owner.message}
            onChange={value => inputChangedHandler('owner', value.value)}
          />
          <View style={styles.btnContainer}>
            <UI.Btn
              disabledBtn={isLoader || userLoader}
              onPressBtn={validationCheck}>
              Save
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

export default EditClient;
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
