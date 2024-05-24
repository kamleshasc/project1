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
import {RootStackNavigationProp} from '../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import useDimensionListener from '../hooks/useDimensionListener';
import {rMS} from '../config/responsive';
import TableHeader from '../components/UI/TableHeader';
import TableRow from '../components/UI/TableRow';
import TableItem from '../components/UI/TableItem';

interface ServiceData {
  id: string | number;
  service: string;
  category: string;
  branch: string[];
  duration: string;
  price: string;
  site: string;
  status: string;
  userList: string[];
  createdDate: string;
  modifiedDate: string;
}

interface servicesProps {
  navigation: RootStackNavigationProp;
}

let serviceData: ServiceData[] = [
  {
    id: 1,
    service: 'Team',
    category: 'team',
    branch: ['ordando', 'miami'],
    duration: '12',
    price: '3',
    site: 'onSite',
    status: 'active',
    userList: ['kamlesh', 'ravi'],
    createdDate: '12 feb, 2024',
    modifiedDate: '14 feb, 2024',
  },
  {
    id: 2,
    service: 'Team Pkg',
    category: 'team',
    branch: ['ordando', 'miami'],
    userList: ['kamlesh', 'ravi', 'kd', 'kamlesh', 'ravi', 'kdd'],
    duration: '12',
    price: '3',
    site: 'onSite',
    status: 'active',
    createdDate: '12 feb, 2024',
    modifiedDate: '14 feb, 2024',
  },
  {
    id: 3,
    service: 'ttt',
    category: 'team',
    branch: ['ordando', 'miami'],
    userList: ['kamlesh', 'ravi', 'kd', 'kamlesh', 'ravi', 'kdd'],
    duration: '12',
    price: '3',
    site: 'onSite',
    status: 'active',
    createdDate: '12 feb, 2024',
    modifiedDate: '14 feb, 2024',
  },
  {
    id: 4,
    service: 'Team 2',
    category: 'team',
    branch: ['ordando', 'miami'],
    userList: ['kamlesh', 'ravi', 'kd', 'kamlesh', 'ravi', 'kdd'],
    duration: '12',
    price: '3',
    site: 'onSite',
    status: 'active',
    createdDate: '12 feb, 2024',
    modifiedDate: '14 feb, 2024',
  },
  {
    id: 5,
    service: 'Team 12',
    category: 'team',
    branch: ['ordando', 'miami'],
    userList: ['kamlesh', 'ravi', 'kd', 'kamlesh', 'ravi', 'kdd'],
    duration: '12',
    price: '3',
    site: 'onSite',
    status: 'active',
    createdDate: '12 feb, 2024',
    modifiedDate: '14 feb, 2024',
  },
  {
    id: 6,
    service: 'Team 12',
    category: 'team',
    branch: ['ordando', 'miami'],
    userList: ['kamlesh', 'ravi', 'kd', 'kamlesh', 'ravi', 'kdd'],
    duration: '12',
    price: '3',
    site: 'onSite',
    status: 'active',
    createdDate: '12 feb, 2024',
    modifiedDate: '14 feb, 2024',
  },
];

function Services({navigation}: servicesProps): React.JSX.Element {
  const dimensions = useDimensionListener();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddService')}
          style={style.iconContainer}>
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onPressService = () => {
    navigation.navigate('EditService');
  };

  const renderItem = ({item}: {item: ServiceData}) => {
    return (
      <TableRow onPress={onPressService}>
        <TableItem name={item.service} />
        <TableItem name={item.category} />
        <TableItem bunchData={item.branch} />
        <TableItem name={item.duration} />
        <TableItem name={item.price} />
        <TableItem name={item.site} />
        <TableItem name={item.status} />
        <TableItem bunchData={item.userList} />
        <TableItem name={item.createdDate} />
        <TableItem name={item.modifiedDate} />
      </TableRow>
    );
  };

  return (
    <SafeAreaView style={style.container}>
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
              'Service',
              'Category',
              'Branch',
              'Duration',
              'Price',
              'Site',
              'Status',
              'User List',
              'Created Date',
              'Modified Date',
            ]}
          />
          <FlatList
            style={style.fullScreen}
            data={serviceData}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Services;

const style = StyleSheet.create({
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
});
