import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../helper/colors';

interface CustomButttonUIProps {
  children?: React.ReactNode;
  disabledBtn?: boolean;
  onPressBtn: () => void;
}

function CustomButton({
  children,
  disabledBtn,
  onPressBtn,
}: CustomButttonUIProps) {
  return (
    <View style={{marginBottom: 20}}>
      <TouchableOpacity
        disabled={disabledBtn}
        style={[
          {
            paddingVertical: 15,
            borderRadius: 10,
            backgroundColor: colors.secondaryDark,
            marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
          },
          disabledBtn && {backgroundColor: '#E5E6EB'},
        ]}
        onPress={onPressBtn}>
        <Text
          style={[
            {
              fontSize: 16,
              lineHeight: 22,
              fontWeight: '500',
              color: colors.fontLight,
            },
            disabledBtn && {color: colors.fontLight},
          ]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default CustomButton;
