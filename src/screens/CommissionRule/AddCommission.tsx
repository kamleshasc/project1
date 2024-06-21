import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {criteriaData} from '../../config/data';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchGetUser} from '../../redux/Action/userAction';
import {rMS} from '../../config/responsive';

function AddCommission() {
  const dispatchAddCommission = useAppDispatch();
  const {data: userData, isLoader} = useAppSelector(
    state => state.user.getUser,
  );
  console.log('userData', userData);

  React.useEffect(() => {
    dispatchAddCommission(fetchGetUser());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Add Commission Rule</Text>
          </View>
          <UI.Input
            textInputConfig={{
              placeholder: 'Name',
              //   value: serviceName.value,
              //   onChangeText: (value: any) =>
              //     inputChangedHandler('serviceName', value),
            }}
            // isError={!serviceName.isValid}
            // errorMsg={serviceName.message}
          />

          <UI.DropDown
            data={criteriaData}
            // onChange={(value: any) =>
            //   inputChangedHandler('duration', value.value)
            // }
            placeholder={'Select Criteria'}
            // value={duration.value}
            // isError={!duration.isValid}
            // errorMsg={duration.message}
          />

          {/* <UI.DropDownMultiSelect
            data={branchData}
            onChange={(value: any) =>
              inputChangedHandler('selectedBranches', value)
            }
            placeholder={'Select Branch'}
            selected={selectedBranches.value}
            isError={!selectedBranches.isValid}
            errorMsg={selectedBranches.message}
          /> */}

          <UI.DropDownMultiSelect
            data={userData.map(value => {
              return {
                label: value.firstName + ' ' + value.lastName,
                value: value.firstName + ' ' + value.lastName,
              };
            })}
            // onChange={(value: any) =>
            //   inputChangedHandler('selectedUsers', value)
            // }
            placeholder={'Select Users'}
            // selected={selectedUsers.value}
            // isError={!selectedUsers.isValid}
            // errorMsg={selectedUsers.message}
          />

          <UI.Input
            textInputConfig={{
              placeholder: 'Value',
              //   value: price.value,
              //   keyboardType: 'number-pad',
              //   onChangeText: (value: any) => inputChangedHandler('price', value),
            }}
            // isError={!price.isValid}
            // errorMsg={price.message}
          />

          <UI.DropDown
            data={userData.map(value => {
              return {
                label: value.firstName + ' ' + value.lastName,
                value: value._id,
              };
            })}
            placeholder={'Created By'}
            // value={createdBy.value}
            // isError={!createdBy.isValid}
            // errorMsg={createdBy.message}
            // onChange={value => inputChangedHandler('createdBy', value.value)}
          />

          {/* <View style={styles.btnContainer}>
            <UI.Btn disabledBtn={isLoader} onPressBtn={validationCheck}>
              Add
            </UI.Btn>
          </View> */}
        </View>
      </ScrollView>
      {/* <UI.Toast
        visible={error}
        message={errorMessage}
        onDismissSnackBar={() => setError(false)}
      /> */}
    </SafeAreaView>
  );
}

export default AddCommission;

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
