import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import { filter, includes, map } from "lodash";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import ISelectOption from "@/interfaces/theme/ISelectOption";

import { TextStyled } from "../typography";
import InputCheckboxStyled from "./InputCheckboxStyled";

type ICheckOption = (ISelectOption & { isChecked: boolean })[];
interface IProps {
  label?: string;
  placeholder?: string;
  options: ISelectOption[];
  value: ICheckOption;
  onChange(selectedImages: ICheckOption): void;
}
const InputCheckboxMultipleStyled: React.FC<IProps> = ({
  label,
  placeholder,
  options,
  onChange,
  value,
}) => {
  const { commonStyles } = useAppStyles();

  const optionsRevized = useMemo(() => {
    const tempOptions = map(value || options, (opt) => {
      const checkedValueIds = map(value, (v) => {
        if (v?.isChecked) {
          return v.value;
        }
      });

      const isChecked = includes(checkedValueIds, opt.value as string) || false;

      return {
        ...opt,
        isChecked,
      };
    });

    return tempOptions;
  }, [options, value]);

  const handleToggle = (valId: ISelectOption["value"], check: boolean) => {
    const updated = map(optionsRevized, (val) => {
      if (val.value === valId) {
        return {
          ...val,
          isChecked: check,
        };
      }

      return val;
    });
    onChange(updated);
  };

  return (
    <View
      style={[
        {
          marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp2,
        },
      ]}
    >
      {label && (
        <View
          style={{
            marginLeft: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          }}
        >
          <TextStyled textAlignment="left" fontSize="md" fontWeight="semibold">
            {label}
          </TextStyled>
        </View>
      )}

      <View
        style={[
          commonStyles.flexStyles.rowWrap,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp1,
            alignItems: "center",
            marginVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          },
        ]}
      >
        {map(optionsRevized, (op, index) => (
          <InputCheckboxStyled
            key={index}
            isChecked={op.isChecked}
            onToggle={(check) => handleToggle(op.value, check)}
            label={op.label}
          />
        ))}
      </View>
      {placeholder && (
        <TextStyled textAlignment="left" fontSize="md" fontWeight="regular">
          {placeholder}
        </TextStyled>
      )}
    </View>
  );
};

export default InputCheckboxMultipleStyled;
