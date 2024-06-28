import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {rMS} from '../../config/responsive';
import {SCREEN, UI} from '../../components';
import {branchData} from '../../config/data';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchService} from '../../redux/Action/serviceAction';
import Icon from 'react-native-vector-icons/AntDesign';
import { DateFormateMMMMDDYYY } from '../../config/helper';
interface singleObjString {
  value: string;
  isValid: boolean;
  message: any;
}
interface singleObjNumber {
  value: number;
  isValid: boolean;
  message: any;
}
interface arrayObj {
  value: any[];
  isValid: boolean;
  message: any;
}

interface inputInvoice {
  client: singleObjString;
  employee: singleObjString;
  branch: singleObjString;
  selectedService: arrayObj;
  dataOfInvoice: singleObjString;
  invoiceNumber: singleObjString;
  invoiceTotal: singleObjNumber;
  totalWithTax: singleObjNumber;
}

const initialInputs: inputInvoice = {
  client: {value: '', isValid: true, message: ''},
  employee: {value: '', isValid: true, message: ''},
  branch: {value: '', isValid: true, message: ''},
  selectedService: {value: [], isValid: true, message: ''},
  dataOfInvoice: {value: '', isValid: true, message: ''},
  invoiceNumber: {value: '', isValid: true, message: ''},
  invoiceTotal: {value: 0, isValid: true, message: ''},
  totalWithTax: {value: 0, isValid: true, message: ''},
};
function AddInvoice() {
  const [selectedServices, setSelectedServices] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showDate, setShowDate] = React.useState(false);
  const dispatchAddInvoice = useAppDispatch();
  const {data: servicesData} = useAppSelector(
    state => state.service.getService,
  );
  const [inputs, setInputs] = React.useState<inputInvoice>(initialInputs);

  const {
    client,
    branch,
    dataOfInvoice,
    employee,
    invoiceNumber,
    invoiceTotal,
    selectedService,
    totalWithTax,
  } = inputs;

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputs(currInputs => {
      return {
        ...currInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  };

  const calculateTax = () => {
    setSelectedServices(prevArray => {
      const arr = [...prevArray];
      let price = arr.reduce((curr, value) => {
        return (curr = curr + value?.price);
      }, 0);
      let tax = (price * 6) / 100;
      let totalWithTax = price + tax;
      inputChangedHandler('invoiceTotal', price);
      inputChangedHandler('totalWithTax', totalWithTax);
      return prevArray;
    });
  };

  const getAllDetails = () => {
    dispatchAddInvoice(fetchService());
  };

  React.useEffect(() => {
    getAllDetails();
  }, []);

  const addValue = addedValue => {
    let addServiceDetail = servicesData.reduce((curr, value) => {
      if (value._id == addedValue) {
        let body = {
          _id: value._id,
          serviceName: value.serviceName,
          duration: value.duration,
          price: value.price,
        };
        curr = body;
      }
      return curr;
    }, null);

    if (addServiceDetail) {
      selectedServices.push(addServiceDetail);
      calculateTax();
    }
  };

  const deleteValue = deleteValue => {
    setSelectedServices(prevArray => {
      const newArray = [...prevArray];
      newArray.splice(deleteValue, 1);
      return newArray;
    });
    calculateTax();
  };

  const handleDateChange = (value: Date) => {
    setShowDate(false);
    if (value) {
      setSelectedDate(value);
      const selectedDate = DateFormateMMMMDDYYY(value);
      inputChangedHandler('dataOfInvoice', selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Add Invoice</Text>
          </View>
          {showDate && (
            <UI.DatePick
              dateValue={selectedDate}
              handleCancelPressed={() => setShowDate(false)}
              handleOkayPressed={(value: Date) => handleDateChange(value)}
            />
          )}
          <UI.DropDown
            data={branchData}
            onChange={(value: any) =>
              inputChangedHandler('client', value.value)
            }
            placeholder={'Select Client Name'}
            value={client.value}
            isError={!client.isValid}
            errorMsg={client.message}
          />
          <UI.DropDown
            data={branchData}
            onChange={(value: any) =>
              inputChangedHandler('employee', value.value)
            }
            placeholder={'Select Employee Name'}
            value={employee.value}
            isError={!employee.isValid}
            errorMsg={employee.message}
          />
          <UI.DropDown
            data={branchData}
            onChange={(value: any) =>
              inputChangedHandler('branch', value.value)
            }
            placeholder={'Select Branch Name'}
            value={branch.value}
            isError={!branch.isValid}
            errorMsg={branch.message}
          />
          <SCREEN.DropDownWithList
            selectedServices={selectedServices}
            addValue={addValue}
            data={servicesData.map(value => {
              return {label: value.serviceName, value: value._id};
            })}
            deleteItem={deleteValue}
          />
          <UI.Input
            showIcon={true}
            disableInput={true}
            textInputConfig={{
              placeholder: 'Date of Invoice',
              value: dataOfInvoice.value,
            }}
            isError={!dataOfInvoice.isValid}
            errorMsg={dataOfInvoice.message}
            iconPressed={() => setShowDate(true)}>
            <Icon name="calendar" size={30} color="black" />
          </UI.Input>
          <UI.Input
            textInputConfig={{
              placeholder: 'Invoice Number',
              onChangeText: (value: any) =>
                inputChangedHandler('invoiceNumber', value),
              value: invoiceNumber.value,
              keyboardType: 'number-pad',
            }}
            isError={!invoiceNumber.isValid}
            errorMsg={invoiceNumber.message}
          />
          <UI.Input
            disableInput={true}
            textInputConfig={{
              placeholder: 'Invoice Total',
              value: invoiceTotal.value != 0 ? `$ ${invoiceTotal.value}` : '',
              keyboardType: 'number-pad',
            }}
            isError={!invoiceTotal.isValid}
            errorMsg={invoiceTotal.message}
          />
          <UI.Input
            disableInput={true}
            textInputConfig={{
              placeholder: 'Tax',
              value: 'Tax 6%',
              keyboardType: 'number-pad',
            }}
          />
          <UI.Input
            disableInput={true}
            textInputConfig={{
              placeholder: 'Total With Tax',
              value: `Total with tax: $ ${totalWithTax.value}`,
              keyboardType: 'number-pad',
            }}
            isError={!totalWithTax.isValid}
            errorMsg={totalWithTax.message}
          />
          <UI.Btn>Submit</UI.Btn>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddInvoice;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fullScreen: {
    flex: 1,
  },
  iconContainer: {
    height: 40,
    width: 40,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    maxWidth: 600,
    alignSelf: 'center',
    flex: 1,
    width: '100%',
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
  dropdown: {
    paddingRight: 8,
    paddingLeft: 14,
    borderWidth: 1.5,
    borderColor: colors.secondaryDark,
    backgroundColor: colors.primary,
    borderRadius: 12,
    // marginBottom: 20,
    // marginHorizontal: 20,
    paddingVertical: 10,
    // width: '70%',
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
  errorContainer: {
    marginTop: -20,
    marginLeft: 16,
    marginBottom: 4,
  },
  errorFont: {
    fontSize: 13,
    fontWeight: '700',
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
});
