import React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import colors from '../../config/colors';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {UI} from '../../components';
import {rMS, rV} from '../../config/responsive';

type CommissionType = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'CommissionRules'>,
  StackScreenProps<RootStackParamList>
>;

function CommissionRules({navigation}: CommissionType) {
  const {width} = useWindowDimensions();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddCommissionRule')}
          style={style.headerIconContainer}>
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  function renderItem({item}) {
    return (
      <UI.TableR
        onPress={() => {
          navigation.navigate('EditCommissionRule');
        }}>
        <UI.TableI name={'First name Value'} />
        <UI.TableI name={'Criteria Value'} />
        <UI.TableI name={'Value value'} />
        <UI.TableI name={'Applicable user value'} />
        <UI.TableI name={'Created value'} />
        <UI.TableI name={'CreatedBy value'} />
        <UI.TableI name={'Updated value'} />
        <UI.TableI name={'UpdatedBy value'} />
      </UI.TableR>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      {/* <ScrollView
        style={style.fullScreen}
        horizontal={true}
        refreshControl={
          <RefreshControl refreshing={isLoader} onRefresh={getUserList} />
        }
      > */}
      <FlatList
        // onRefresh={}
        // refreshing={}
        data={new Array(1)}
        horizontal={true}
        renderItem={() => (
          <View style={style.fullScreen}>
            <UI.TableH
              headers={[
                'Name',
                'Criteria',
                'Value',
                'Applicable User',
                'Created Date',
                'Created By',
                'Updated Date',
                'Updated By',
              ]}
            />
            <FlatList
              data={new Array(2)}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      {/* <UI.Toast
        visible={showError}
        message={errorMsg}
        onDismissSnackBar={() => setShowError(false)}
      /> */}
    </SafeAreaView>
  );
}

export default CommissionRules;

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
