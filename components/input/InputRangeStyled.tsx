import { useEffect, useMemo, useRef, useState } from 'react';
import { IIconNames, IInputProps } from '@/interfaces/app';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import { useAppTheme } from '@/contexts/ThemeContext';
import { TextStyled } from '../typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import IconBell from '../svg/icon/IconBell';
import useCommonStyles from '@/hooks/useCommonStyles';
import { getIconWithProps } from '../svg/icon';
import IconEyeHide from '../svg/icon/IconEyeHide';
import IconEyeShow from '../svg/icon/IconEyeShow';
import { useInputFocus } from '@/contexts/InputFocusContext';
import InputStyled from './InputStyled';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface IProps
  extends React.ComponentProps<typeof TextInput>,
    Omit<IInputProps, 'required' | 'type'> {}

const InputRangeStyled: React.FC<IProps> = ({
  placeholder,
  label,
  name,
  ...props
}) => {
  const inputRef = useRef<TextInput>(null);
  const { registerInput, unregisterInput } = useInputFocus();
  const [range, setRange] = useState([16, 44]); // Başlangıç değerleri
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();

  const leftIconName = useMemo(() => {
    let iconName: IIconNames | null = null;

    switch (name) {
      case 'email':
        iconName = 'IconEmail';
        break;
      case 'password':
        iconName = 'IconLock';
        break;
      case 'confirmPassword':
        iconName = 'IconLock';
        break;
    }

    return iconName;
  }, [name]);

  useEffect(() => {
    // Input'u context'e kaydet
    if (inputRef.current) {
      registerInput(inputRef);
    }
    return () => {
      // Input'u context'ten çıkar
      unregisterInput(inputRef);
    };
  }, [registerInput, unregisterInput]);

  return (
    <View>
      {label && (
        <View
          style={{
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
            marginLeft: APP_STYLE_VALUES.SPACE_SIZES.sp1,
          }}
        >
          <TextStyled textAlignment="left" fontSize="md" fontWeight="regular">
            {label}
          </TextStyled>
        </View>
      )}

      <View
        style={[
          commonStyles.flexStyles.rowStart,
          {
            flex: 1,
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            alignItems: 'center',
          },
        ]}
      >
        <MultiSlider
          values={range}
          sliderLength={300} // Slider genişliği (px)
          onValuesChange={(values) => setRange(values)} // Değer değişikliği
          min={10} // Minimum değer
          max={50} // Maksimum değer
          step={1} // Adım büyüklüğü
          selectedStyle={{
            backgroundColor: '#FF5733', // Seçilen aralık rengi
          }}
          unselectedStyle={{
            backgroundColor: '#D3D3D3', // Seçilmeyen aralık rengi
          }}
          markerStyle={{
            backgroundColor: '#FF5733', // Thumb rengi
            height: 20,
            width: 20,
            borderRadius: 10,
          }}
          containerStyle={{
            height: 40,
          }}
          trackStyle={{
            height: 4,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
  slider: {
    width: 300,
    height: 40,
  },
});

export default InputRangeStyled;
