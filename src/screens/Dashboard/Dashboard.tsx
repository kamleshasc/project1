import React from 'react';
import {Alert, Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import colors from '../../config/colors';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

function Dashboard(): React.JSX.Element {
  const requestPermissions = async () => {
    const cameraPermission = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    // const photoLibraryPermission = await request(
    //   Platform.OS === 'ios'
    //     ? PERMISSIONS.IOS.PHOTO_LIBRARY
    //     : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    // );

    if (
      cameraPermission !== RESULTS.GRANTED
      // photoLibraryPermission !== RESULTS.GRANTED
    ) {
      Alert.alert(
        'Permissions required',
        'This app needs camera and photo library access to function correctly.',
      );
    }
  };

  React.useEffect(() => {
    requestPermissions();
  }, []);
  return (
    <SafeAreaView style={style.container}>
      <Text style={{color: colors.fontDark}}>Dashboard</Text>
    </SafeAreaView>
  );
}

export default Dashboard;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
