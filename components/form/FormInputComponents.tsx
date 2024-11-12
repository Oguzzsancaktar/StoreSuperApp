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

interface IProps extends Omit<IInputProps, 'required'> {
  onChange(): void;
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
  options = [],
  placeholder,
  name,
  formInstance,
  maxMedia,
}) => {
  const { watch } = formInstance;

  const selectedCountry = watch('country');

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
      case 'multiple-checkbox':
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
      case 'select':
        component = (() => {
          let selectComponent = (
            <InputSelectStyled
              label={label}
              handleSelect={onChange}
              options={options}
              variant="transparent"
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

            default:
              selectComponent = (
                <InputSelectStyled
                  label={label}
                  handleSelect={onChange}
                  options={options}
                  variant="transparent"
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
