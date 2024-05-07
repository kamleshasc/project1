import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
} from 'react-native';
import colors from '../styles/colors';

function Users(): React.JSX.Element {

    return (
        <SafeAreaView style={style.container}>
            <Text style={{ color: colors.fontDark }}>Users</Text>
        </SafeAreaView>
    );
}

export default Users;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    }
})
