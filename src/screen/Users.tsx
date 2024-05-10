import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../helper/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import useDimensionListener from '../hooks/useDimensionListener';
import {rMS} from '../helper/responsive';
import TableHeader from '../components/UI/TableHeader';
import TableRow from '../components/UI/TableRow';
import TableItem from '../components/UI/TableItem';
import {RootStackNavigationProp} from '../navigation/RootNavigation';

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
      <TableRow onPress={() => navigation.navigate('EditUser')}>
        <TableItem ImgUrl={'kk'} name={item.userImg} />
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
      <View
        style={[
          style.fullScreen,
          {
            width: rMS(dimensions.screen.width, 2),
          },
        ]}>
        <ScrollView
          style={[
            style.fullScreen,
            {
              width: rMS(dimensions.screen.width, 0),
            },
          ]}
          horizontal={true}>
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
      </View>
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
