import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {HelperText} from 'react-native-paper';
import colors from '../../helper/colors';
import {Props} from 'react-native-paper/lib/typescript/components/Searchbar';

interface CustomInputUIProps {
  showIcon?: boolean;
  textInputConfig: Props;
  disableInput?: boolean;
  isError?: boolean;
  errorMsg?: string;
  iconPressed?: () => void;
  children?: React.ReactNode;
}

function CustomInput({
  showIcon,
  textInputConfig,
  disableInput,
  isError,
  errorMsg,
  iconPressed,
  children,
}: CustomInputUIProps) {
  return (
    <>
      <View style={styles.container}>
        <View style={{width: showIcon ? '85%' : '90%'}}>
          <TextInput
            style={styles.fontStyle}
            editable={!disableInput}
            {...textInputConfig}
          />
        </View>
        {showIcon && (
          <TouchableOpacity
            style={styles.childrenContainer}
            onPress={iconPressed}>
            {children}
          </TouchableOpacity>
        )}
      </View>
      {isError && (
        <View style={styles.errorContainer}>
          <HelperText type="error" visible={true} style={{}}>
            {errorMsg}
          </HelperText>
        </View>
      )}
    </>
  );
}

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: colors.secondaryDark,
    backgroundColor: colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  fontStyle: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.fontDark,
  },
  childrenContainer: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  errorContainer: {
    marginTop: -20,
    marginLeft: 16,
  },
});
