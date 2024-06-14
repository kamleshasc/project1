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
import colors from '../../config/colors';
import {RootStackParamList} from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import useDimensionListener from '../../hooks/useDimensionListener';
import {rMS} from '../../config/responsive';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {RootState} from '../../redux/store';
import {fetchService} from '../../redux/Action/serviceAction';
import {clearGetServiceErrorMsg} from '../../redux/Reducer/serviceReducer/getServiceSlice';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {UI} from '../../components';
import {DateFormateMMMMDDYYY} from '../../config/helper';

export interface ServiceData {
  _id: string | number;
  serviceName: string;
  category: string;
  selectedBranches: string[];
  duration: string;
  price: string;
  onsiteOffsite: string;
  status: string;
  selectedUsers: string[];
  serviceImage: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

type Props = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'Services'>,
  StackScreenProps<RootStackParamList>
>;

function Services({navigation}: Props): React.JSX.Element {
  const dimensions = useDimensionListener();
  const serviceDispatch = useAppDispatch();
  const {data, isLoader, errorMsg, isError} = useAppSelector(
    (state: RootState) => state.service.getService,
  );

  const getServiceList = () => {
    serviceDispatch(fetchService());
  };

  React.useEffect(() => {
    getServiceList();
  }, []);

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

  const onPressService = (value: ServiceData) => {
    navigation.navigate('EditService', {service: value});
  };

  const renderItem = ({item}: {item: ServiceData}) => {
    return (
      <UI.TableR onPress={() => onPressService(item)}>
        <UI.TableI ImgUrl={item.serviceImage} />
        <UI.TableI name={item.serviceName} />
        <UI.TableI name={item.category} />
        <UI.TableI bunchData={item.selectedBranches} />
        <UI.TableI name={item.duration} />
        <UI.TableI name={item.price} />
        <UI.TableI name={item.onsiteOffsite} />
        <UI.TableI name={item.status} />
        <UI.TableI bunchData={item.selectedUsers} />
        <UI.TableI name={DateFormateMMMMDDYYY(item.createdAt)} />
        <UI.TableI name={DateFormateMMMMDDYYY(item.updatedAt)} />
      </UI.TableR>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoader} onRefresh={getServiceList} />
        }
        style={[
          style.fullScreen,
          {
            width: rMS(dimensions.screen.width, 0),
          },
        ]}
        horizontal={true}>
        <View style={style.fullScreen}>
          <UI.TableH
            headers={[
              'Service Image',
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
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item._id.toString()}
          />
          <UI.Toast
            visible={isError}
            message={errorMsg}
            onDismissSnackBar={() => serviceDispatch(clearGetServiceErrorMsg())}
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
