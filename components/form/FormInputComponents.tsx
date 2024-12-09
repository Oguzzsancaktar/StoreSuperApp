import React, { useMemo } from 'react';
import InputImageUploader from '../input/InputImageUploader';
import InputSelectStyled from '../input/InputSelectStyled';
import InputSelectCountry from '../input/InputSelectCountry';
import InputSelectCity from '../input/InputSelectCity';
import { IInputProps } from '@/interfaces/app';
import InputCheckboxStyled from '../input/InputCheckboxStyled';
import { InputStyled } from '../input';
import { UseFormReturn } from 'react-hook-form';
import InputCheckboxMultipleStyled from '../input/InputCheckboxMultipleStyled';
import InputSelectDistrict from '../input/InputSelectDistrict';
import InputSwitchStyled from '../input/InputSwitchStyled';
import InputMinMaxStyled from '../input/InputMinMaxStyled';
import InputRangeStyled from '../input/InputRangeStyled';
import InputDatePickerStyled from '../input/InputDatePickerStyled';

interface IProps extends Omit<IInputProps, 'required'> {
  onChange(...event: any[]): void;
  onBlur(): void;
  value: any;
  formInstance: UseFormReturn<Record<string, any>, any, undefined>;
}
const FormInputComponents: React.FC<IProps> = ({
  type,
  onBlur,
  onChange,
  value,
  label,
  showReset,
  searchable,
  options = [],
  placeholder,
  name,
  formInstance,
  maxMedia,
}) => {
  const { watch } = formInstance;

  const selectedCountry = watch('country');
  const selectedCity = watch('city');

  const InputComponent = useMemo(() => {
    let component = (
      <InputStyled
        name={name}
        type={type}
        label={label}
        style={{ borderWidth: 1, padding: 10 }}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
      />
    );

    switch (type) {
      case 'date':
        component = (
          <InputDatePickerStyled
            onChange={onChange}
            name={name}
            type={type}
            label={label}
            value={value}
            placeholder={placeholder}
          />
        );
        break;

      case 'range':
        component = (
          <InputRangeStyled
            label={label}
            name={name}
            value={value}
            onChange={onChange}
          />
        );
        break;

      case 'input-min-max':
        component = (
          <InputMinMaxStyled
            label={label}
            name={name}
            value={value}
            onChange={onChange}
          />
        );
        break;

      case 'checklist':
        component = (
          <InputCheckboxMultipleStyled
            value={value}
            onChange={onChange}
            options={options}
            label={label}
          />
        );
        break;
      case 'upload':
        component = (
          <InputImageUploader
            label={label}
            value={value}
            onChange={onChange}
            maxMedia={maxMedia}
          />
        );
        break;
      case 'checkbox':
        component = (
          <InputCheckboxStyled
            label={label}
            placeholder={placeholder}
            onToggle={onChange}
            isChecked={value}
          />
        );
        break;
      case 'switch':
        component = (
          <InputSwitchStyled
            label={label}
            isOn={value}
            onToggle={() => onChange(!value)}
          />
        );
        break;
      case 'select':
      case 'select2':
        component = (() => {
          let selectComponent = (
            <InputSelectStyled
              searchable={searchable}
              showReset={showReset}
              label={label}
              handleSelect={onChange}
              options={options}
              variant="grayOutlined"
              value={value}
            />
          );

          switch (name) {
            case 'country':
              selectComponent = (
                <InputSelectCountry handleSelect={onChange} value={value} />
              );
              break;

            case 'city':
              selectComponent = (
                <InputSelectCity
                  countryId={selectedCountry?.value}
                  handleSelect={onChange}
                  value={value}
                />
              );
              break;

            case 'district':
              selectComponent = (
                <InputSelectDistrict
                  cityId={selectedCity?.value}
                  handleSelect={onChange}
                  value={value}
                />
              );
              break;

            default:
              selectComponent = (
                <InputSelectStyled
                  searchable={searchable}
                  showReset={showReset}
                  label={label}
                  handleSelect={onChange}
                  options={options}
                  variant="grayOutlined"
                  value={value}
                />
              );
              break;
          }

          return selectComponent;
        })();

        break;

      default:
        component = (
          <InputStyled
            name={name}
            type={type}
            label={label}
            style={{ borderWidth: 1, padding: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
          />
        );
        break;
    }
    return component;
  }, [type, onBlur, onChange, value, label, options, placeholder, name]);

  return InputComponent;
};

export default FormInputComponents;
