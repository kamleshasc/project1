import React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import TableHeader from '../components/UI/TableHeader';
import TableRow from '../components/UI/TableRow';
import TableItem from '../components/UI/TableItem';
import {RootStackParamList} from '../navigation/RootNavigation';
import {fetchGetUser} from '../redux/Action/userAction';
import {useAppDispatch, useAppSelector} from '../hooks/storeHook';
import ToastMessage from '../components/UI/ToastMessage';
import {DrawerNavigationParamList} from '../navigation/DrawerNavigation';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import {DateFormateMMMMDDYYY, formatMobileNumber} from '../config/helper';

export interface UserData {
  _id: string;
  userImg: string;
  firstName: string;
  lastName: string;
  title: string;
  mobileNumber: object;
  email: string;
  dateOfjoining: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  status: string;
}

type Props = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'Users'>,
  StackScreenProps<RootStackParamList>
>;

function Users({navigation}: Props) {
  const dispatch = useAppDispatch();
  const {data, isLoader, isError, errorMsg} = useAppSelector(
    state => state.user.getUser,
  );
  const [showError, setShowError] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddUser')}
          style={style.headerIconContainer}>
          <Icon name="adduser" size={30} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getUserList = () => {
    dispatch(fetchGetUser());
  };

  React.useEffect(() => {
    getUserList();
  }, []);

  React.useEffect(() => {
    if (isError && !showError) {
      setShowError(isError);
    }
  }, [isLoader]);

  const onPressUser = (value: UserData) => {
    navigation.navigate('EditUser', {user: value});
  };

  function renderItem({item}: {item: UserData}) {
    return (
      <TableRow
        onPress={() => {
          onPressUser(item);
        }}>
        <TableItem ImgUrl={'kk'} />
        <TableItem name={item.firstName} />
        <TableItem name={item.lastName} />
        <TableItem name={item.title} />
        <TableItem name={formatMobileNumber(item.mobileNumber)} />
        <TableItem name={item.email} />
        <TableItem name={item.dateOfjoining} />
        <TableItem name={DateFormateMMMMDDYYY(item.createdAt)} />
        <TableItem name={DateFormateMMMMDDYYY(item.updatedAt)} />
        <TableItem name={item.role} />
        <TableItem name={item.status} />
      </TableRow>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        style={style.fullScreen}
        horizontal={true}
        refreshControl={
          <RefreshControl refreshing={isLoader} onRefresh={getUserList} />
        }>
        <View style={style.fullScreen}>
          <TableHeader
            headers={[
              'User Image',
              'First Name',
              'Last Name',
              'Title',
              'Mobile Number',
              'Email',
              'Date Of Joining',
              'Created Date',
              'Modified Date',
              'Role',
              'Status',
            ]}
          />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </ScrollView>
      <ToastMessage
        visible={showError}
        message={errorMsg}
        onDismissSnackBar={() => setShowError(false)}
      />
    </SafeAreaView>
  );
}

export default Users;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fullScreen: {
    flex: 1,
  },
  headerIconContainer: {
    height: 40,
    width: 40,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
