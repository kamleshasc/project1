import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import useDimensionListener from '../hooks/useDimensionListener';
import {rMS} from '../config/responsive';
import TableHeader from '../components/UI/TableHeader';
import TableRow from '../components/UI/TableRow';
import TableItem from '../components/UI/TableItem';
import {RootStackNavigationProp} from '../navigation/RootNavigation';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {fetchGetUser} from '../redux/Action/userAction';
import {AppDispatch, RootState} from '../redux/store';
import {useAppDispatch, useAppSelector} from '../hooks/storeHook';

interface UserData {
  key: number;
  userImg: string;
  firstname: string;
  lastname: string;
  title: string;
  mobileNo: string;
  email: string;
  doj: string;
  createdDate: string;
  modifiedDate: string;
  role: string;
  status: string;
}

interface UsersProps {
  navigation: RootStackNavigationProp;
}

function Users({navigation}: UsersProps) {
  const [items] = React.useState([
    {
      key: 1,
      userImg: 'Imageeee',
      firstname: 'Kamlesh',
      lastname: 'Mudaliar',
      title: 'CC',
      mobileNo: '7990076645',
      email: 'kamlesh@gmail.com',
      doj: 'Apr 26,2024',
      createdDate: 'Apr 26,2024',
      modifiedDate: 'Apr 26,2024',
      role: 'Team Lead',
      status: 'Active',
    },
    {
      key: 2,
      userImg: '',
      firstname: 'Kamlesh',
      lastname: 'Mudaliar',
      title: 'CC',
      mobileNo: '7990076645',
      email: 'kamlesh@gmail.com',
      doj: 'Apr 26,2024',
      createdDate: 'Apr 26,2024',
      modifiedDate: 'Apr 26,2024',
      role: 'Team Lead',
      status: 'Active',
    },
    {
      key: 3,
      userImg: '',
      firstname: 'Kamlesh',
      lastname: 'Mudaliar',
      title: 'CC',
      mobileNo: '7990076645',
      email: 'kamlesh@gmail.com',
      doj: 'Apr 26,2024',
      createdDate: 'Apr 26,2024',
      modifiedDate: 'Apr 26,2024',
      role: 'Team Lead',
      status: 'Active',
    },
    {
      key: 4,
      userImg: '',
      firstname: 'Kamlesh',
      lastname: 'Mudaliar',
      title: 'CC',
      mobileNo: '7990076645',
      email: 'kamlesh@gmail.com',
      doj: 'Apr 26,2024',
      createdDate: 'Apr 26,2024',
      modifiedDate: 'Apr 26,2024',
      role: 'Team Lead',
      status: 'Active',
    },
    {
      key: 5,
      userImg: '',
      firstname: 'Kamlesh',
      lastname: 'Mudaliar',
      title: 'CC',
      mobileNo: '7990076645',
      email: 'kamlesh@gmail.com',
      doj: 'Apr 26,2024',
      createdDate: 'Apr 26,2024',
      modifiedDate: 'Apr 26,2024',
      role: 'Team Lead',
      status: 'Active',
    },
    {
      key: 6,
      userImg: '',
      firstname: 'Kamlesh',
      lastname: 'Mudaliar',
      title: 'CC',
      mobileNo: '7990076645',
      email: 'kamlesh@gmail.com',
      doj: 'Apr 26,2024',
      createdDate: 'Apr 26,2024',
      modifiedDate: 'Apr 26,2024',
      role: 'Team Lead',
      status: 'Active',
    },
  ]);

  const dispatch = useAppDispatch();
  const {data, isLoader, isError, errorMsg} = useAppSelector(
    state => state.user,
  );
  console.log(
    isLoader,
    '<= isLoader',
    data,
    '<= data',
    errorMsg,
    '<= errrr',
    isError,
    '<= isError',
  );

  // console.log(
  //   data,
  //   'prrrrr',
  //   isLoader,
  //   'isLoader',
  //   isError,
  //   'isError',
  //   errorMsg,
  //   'errorMsg',
  // );

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

  const dimensions = useDimensionListener();

  function renderItem({item}: {item: UserData}) {
    return (
      <TableRow
        onPress={() => {
          dispatch(fetchGetUser());
        }}>
        <TableItem ImgUrl={'kk'} />
        <TableItem name={item.firstname} />
        <TableItem name={item.lastname} />
        <TableItem name={item.title} />
        <TableItem name={item.mobileNo} />
        <TableItem name={item.email} />
        <TableItem name={item.doj} />
        <TableItem name={item.createdDate} />
        <TableItem name={item.modifiedDate} />
        <TableItem name={item.role} />
        <TableItem name={item.status} />
      </TableRow>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={style.fullScreen} horizontal={true}>
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
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.key.toString()}
          />
        </View>
      </ScrollView>
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
