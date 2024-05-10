import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {HelperText} from 'react-native-paper';
import colors from '../../helper/colors';

function CustomInput({
  showIcon,
  showText,
  textInputConfig,
  disableInput,
  isError,
  errorMsg,
  iconPressed,
  children,
}) {
  return (
    <>
      <View
        style={[
          {
            borderWidth: 1.5,
            borderColor: colors.secondaryDark,
            backgroundColor: colors.primary,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            marginHorizontal: 20,
            paddingVertical: 4,
          },
        ]}>
        <View
          style={[
            {width: '90%', marginLeft: 8},
            showIcon && {width: '85%'},
            showText && {width: '69%'},
          ]}>
          <TextInput
            style={[
              {
                fontSize: 16,
                lineHeight: 22,
                color: '#4E5969',
              },
              disableInput && {color: '#86909C'},
            ]}
            editable={!disableInput}
            placeholderTextColor={'#C9CDD4'}
            {...textInputConfig}
          />
        </View>

        {showIcon && (
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 4,
            }}
            onPress={iconPressed}>
            {children}
          </TouchableOpacity>
        )}
      </View>
      {isError && (
        <View style={{marginTop: -20, marginLeft: 16}}>
          <HelperText type="error" visible={true} style={{}}>
            {errorMsg}
          </HelperText>
        </View>
      )}
    </>
  );
}

export default CustomInput;
