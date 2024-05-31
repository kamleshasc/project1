import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../config/colors';
import CustomInput from '../components/UI/CustomInput';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../components/UI/CustomButton';
import {rMS} from '../config/responsive';
import DatePickerUI from '../components/UI/DatePickerUI';
import CustomDropdown from '../components/UI/CustomDropdown';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import ToastMessage from '../components/UI/ToastMessage';
import {RootStackParamList} from '../navigation/RootNavigation';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {
  DateFormateMMMMDDYYY,
  deformatMobileNumber,
  formatMobileNumber,
} from '../config/helper';
import {useAppDispatch, useAppSelector} from '../hooks/storeHook';
import {fetchGetUser, fetchUpdateUser} from '../redux/Action/userAction';

const roleData = [
  {label: 'Super User', value: 'Super User'},
  {label: 'Branch Manager', value: 'Branch Manager'},
  {label: 'Team Lead', value: 'Team Lead'},
  {label: 'Normal User', value: 'Normal User'},
];
const statusData = [
  {label: 'Active', value: 'Active'},
  {label: 'Deactive', value: 'Deactive'},
];

interface objValues {
  value: any;
  isValid: boolean;
  message: any;
}

interface userInputsTypes {
  firstName: objValues;
  lastName: objValues;
  email: objValues;
  title: objValues;
  role: objValues;
  mobileNumber: objValues;
  dateOfjoining: objValues;
  status: objValues;
  userImg: objValues;
}

const initialInputs: userInputsTypes = {
  firstName: {value: '', isValid: true, message: ''},
  lastName: {value: '', isValid: true, message: ''},
  email: {value: '', isValid: true, message: ''},
  title: {value: '', isValid: true, message: ''},
  role: {value: '', isValid: true, message: ''},
  mobileNumber: {value: '', isValid: true, message: ''},
  dateOfjoining: {value: '', isValid: true, message: ''},
  status: {value: '', isValid: true, message: ''},
  userImg: {value: '', isValid: true, message: ''},
};

type Props = NativeStackScreenProps<RootStackParamList, 'EditUser'>;

function EditUser({route, navigation}: Props): React.JSX.Element {
  const {user} = route.params;
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [inputs, setInputs] = React.useState<userInputsTypes>(initialInputs);
  const [showDate, setShowDate] = React.useState(false);
  const [formValue, setFormValue] = React.useState<any>();
  const [fileName, setFileName] = React.useState('');
  const [message, setMessage] = React.useState<any>('');
  const [showMessage, setShowMessage] = React.useState(false);
  const reg =
    /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|international|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  let numbers = /^\d+$/;
  const dispatch = useAppDispatch();
  const {errorMsg, isError, isLoader} = useAppSelector(
    state => state.user.updateUser,
  );

  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    title,
    dateOfjoining,
    role,
    status,
    userImg,
  } = inputs;

  const fieldsKeys = [
    'firstName',
    'lastName',
    'email',
    'mobileNumber',
    'title',
    'dateOfjoining',
    'role',
    'status',
    'userImg',
  ];

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

  const handleDateChange = (value: Date) => {
    setShowDate(false);
    if (value) {
      setSelectedDate(value);
      const formatedDate = DateFormateMMMMDDYYY(value);
      inputChangedHandler('DOJ', formatedDate);
    }
  };

  const onImageGalleryClick = () => {
    try {
      let options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 1,
      };
      launchImageLibrary(options, (response: ImagePickerResponse) => {
        setMessage('');
        if (response.didCancel) {
          setShowMessage(true);
          setMessage('Image Not Selected');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          setShowMessage(true);
          setMessage('Camera Not Avaliable');
          return;
        } else if (response.errorCode == 'permission') {
          setShowMessage(true);
          setMessage('This Application Needs Camera Permission');
          return;
        } else if (response.errorCode == 'others') {
          setShowMessage(true);
          setMessage(response.errorMessage);
          return;
        }
        const responseResult = response.assets;

        if (!responseResult) {
          setShowMessage(true);
          setMessage('Image is not supported.');
          return;
        }
        const file = responseResult['0'];
        const formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          // Platform.OS === 'android'
          //   ? file.uri
          //   : file.uri.replace('file://', ''),
          type: file.type,
          name: file.fileName,
        });

        if (
          file.type !== 'image/jpeg' &&
          file.type !== 'image/jpg' &&
          file.type !== 'image/png'
        ) {
          setShowMessage(true);
          setMessage('Only .jpeg,.jpg and .png Format Are Supported ');
          return;
        }
        setFileName(file.fileName ? file.fileName : '');
        setFormValue(formData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetails = () => {
    let userId = user._id;
    const payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      title: title.value,
      mobileNumber: deformatMobileNumber(mobileNumber.value),
      dateOfjoining: dateOfjoining.value,
      status: status.value,
      role: role.value,
    };
    dispatch(fetchUpdateUser({userId, payload}));
    setTimeout(() => {
      if (!isLoader && !isError) {
        navigation.goBack();
        dispatch(fetchGetUser());
      }
    }, 200);
  };

  const checkValidation = () => {
    let firstnameIsValid = true;
    let firstnameIsValidMsg = '';
    let lastnameIsValid = true;
    let lastnameMessage = '';
    let emailIsValid = true;
    let emailMessage = '';
    let titleIsValid = true;
    let titleMessage = '';
    let mobilenoIsValid = true;
    let mobilenoMessage = '';
    let DOJIsValid = true;
    let DOJMessage = '';
    let statusIsValid = true;
    let statusMessage = '';
    let roleIsValid = true;
    let roleMessage = '';
    // let userImgIsValid = true;
    // let userImgMessage = '';

    if (firstName.value.trim().length <= 0) {
      firstnameIsValid = false;
      firstnameIsValidMsg = 'First Name is required.';
    }
    if (lastName.value.trim().length <= 0) {
      lastnameIsValid = false;
      lastnameMessage = 'Last Name is required.';
    }

    if (email.value.trim().length <= 0) {
      emailMessage = 'Email Is Required.';
      emailIsValid = false;
    } else if (email.value.trim().length > 0 && !reg.test(email.value)) {
      emailMessage = 'Invalid Email.';
      emailIsValid = false;
    }

    if (title.value.trim().length <= 0) {
      titleIsValid = false;
      titleMessage = 'Title is required.';
    }

    if (dateOfjoining.value.trim().length <= 0) {
      DOJIsValid = false;
      DOJMessage = 'Date of Joining is required.';
    }

    if (
      mobileNumber.value.trim().length > 0 &&
      !numbers.test(mobileNumber.value)
    ) {
      mobilenoMessage = 'Mobile No. is invalid.';
      mobilenoIsValid = false;
    } else if (mobileNumber.value.trim().length <= 0) {
      mobilenoMessage = 'Mobile No. is required.';
      mobilenoIsValid = false;
    } else if (mobileNumber.value.trim().length < 10) {
      mobilenoMessage = 'Mobile No. must have 10 digits.';
      mobilenoIsValid = false;
    }

    if (status.value.trim().length <= 0) {
      statusIsValid = false;
      statusMessage = 'Status is required.';
    }
    if (role.value.trim().length <= 0) {
      roleIsValid = false;
      roleMessage = 'Role is required.';
    }
    // if (userImg.value.trim().length <= 0) {
    //   userImgIsValid = false;
    //   userImgMessage = 'Upload Img is required.';
    // }

    if (
      !firstnameIsValid ||
      !lastnameIsValid ||
      !emailIsValid ||
      !titleIsValid ||
      !mobilenoIsValid ||
      !DOJIsValid ||
      !statusIsValid ||
      // !userImgIsValid ||
      !roleIsValid
    ) {
      setInputs(curInputs => {
        return {
          ...curInputs,
          firstName: {
            message: firstnameIsValidMsg,
            value: curInputs.firstName.value,
            isValid: firstnameIsValid,
          },
          lastName: {
            message: lastnameMessage,
            value: curInputs.lastName.value,
            isValid: lastnameIsValid,
          },
          email: {
            message: emailMessage,
            value: curInputs.email.value,
            isValid: emailIsValid,
          },
          title: {
            message: titleMessage,
            value: curInputs.title.value,
            isValid: titleIsValid,
          },
          mobileNumber: {
            message: mobilenoMessage,
            value: curInputs.mobileNumber.value,
            isValid: mobilenoIsValid,
          },
          dateOfjoining: {
            message: DOJMessage,
            value: curInputs.dateOfjoining.value,
            isValid: DOJIsValid,
          },
          status: {
            message: statusMessage,
            value: curInputs.status.value,
            isValid: statusIsValid,
          },
          role: {
            message: roleMessage,
            value: curInputs.role.value,
            isValid: DOJIsValid,
          },
          // userImg: {
          //   message: userImgMessage,
          //   value: curInputs.userImg.value,
          //   isValid: userImgIsValid,
          // },
        };
      });
      return;
    }
    updateUserDetails();
  };

  const onChangeRole = (value: {value: any}) => {
    inputChangedHandler('role', value.value);
  };

  const onChangeStatus = (value: {value: any}) => {
    inputChangedHandler('status', value.value);
  };

  const fetchUserDetails = (user: any) => {
    let keys = Object.keys(user).filter(x => fieldsKeys.indexOf(x) > -1);
    for (let key of keys) {
      if (key == 'mobileNumber') {
        inputChangedHandler(key, formatMobileNumber(user[key]) || '');
        return;
      }
      inputChangedHandler(key, user[key] || '');
    }
  };

  React.useEffect(() => {
    fetchUserDetails(user);
  }, []);

  React.useEffect(() => {
    if (isError && !showMessage) {
      setShowMessage(isError);
      setMessage(errorMsg);
    }
  }, [isLoader]);

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

        <View style={style.subContainer}>
          <View style={style.titleContainer}>
            <Text style={style.titleContent}>Edit User</Text>
          </View>

          <CustomInput
            textInputConfig={{
              placeholder: 'First Name',
              onChangeText: (value: any) =>
                inputChangedHandler('firstName', value),
              value: firstName.value,
            }}
            isError={!firstName.isValid}
            errorMsg={firstName.message}
          />

          <CustomInput
            textInputConfig={{
              placeholder: 'Last Name',
              onChangeText: (value: any) =>
                inputChangedHandler('lastName', value),
              value: lastName.value,
            }}
            isError={!lastName.isValid}
            errorMsg={lastName.message}
          />

          <CustomInput
            textInputConfig={{
              placeholder: 'Email',
              onChangeText: (value: any) => inputChangedHandler('email', value),
              value: email.value,
            }}
            isError={!email.isValid}
            errorMsg={email.message}
          />

          <CustomInput
            textInputConfig={{
              placeholder: 'Mobile Number',
              onChangeText: (value: any) =>
                inputChangedHandler('mobileNumber', value),
              value: mobileNumber.value,
              keyboardType: 'phone-pad',
            }}
            isError={!mobileNumber.isValid}
            errorMsg={mobileNumber.message}
          />

          <CustomInput
            textInputConfig={{
              placeholder: 'Title',
              onChangeText: (value: any) => inputChangedHandler('title', value),
              value: title.value,
            }}
            isError={!title.isValid}
            errorMsg={title.message}
          />

          <CustomInput
            showIcon={true}
            disableInput={true}
            textInputConfig={{
              placeholder: 'Date of Joining',
              value: dateOfjoining.value,
            }}
            isError={!dateOfjoining.isValid}
            errorMsg={dateOfjoining.message}
            iconPressed={() => setShowDate(true)}>
            <Icon name="calendar" size={30} color="black" />
          </CustomInput>

          <CustomDropdown
            data={roleData}
            placeholder={'Role'}
            value={role.value}
            isError={!role.isValid}
            errorMsg={role.message}
            onChange={onChangeRole}
          />

          <CustomInput
            showIcon={true}
            disableInput={true}
            textInputConfig={{value: fileName, placeholder: 'Upload Img'}}
            iconPressed={() => onImageGalleryClick()}
            isError={!userImg.isValid}
            errorMsg={userImg.message}>
            <Icon name="upload" size={30} color="black" />
          </CustomInput>

          <CustomDropdown
            data={statusData}
            placeholder={'Status'}
            value={status.value}
            isError={!status.isValid}
            errorMsg={status.message}
            onChange={onChangeStatus}
          />
          <CustomButton
            disabledBtn={isLoader}
            onPressBtn={() => checkValidation()}>
            Save
          </CustomButton>
        </View>
      </ScrollView>
      <ToastMessage
        message={message}
        visible={showMessage}
        onDismissSnackBar={() => setShowMessage(false)}
      />
    </SafeAreaView>
  );
}

export default EditUser;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  subContainer: {
    alignSelf: 'center',
    maxWidth: 600,
    flex: 1,
    marginBottom: 30,
  },
  titleContainer: {
    marginVertical: rMS(40),
    alignItems: 'center',
  },
  titleContent: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.fontDark,
  },
});
