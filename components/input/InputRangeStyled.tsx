import { useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";

import MultiSlider from "@ptomasroos/react-native-multi-slider";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import { IInputProps } from "@/interfaces/app";

import { TextStyled } from "../typography";

interface IProps extends Omit<IInputProps, "required" | "type"> {
  value: number[];
  onChange(value: number[]): void;
}

const InputRangeStyled: React.FC<IProps> = ({
  placeholder,
  label,
  name,
  value,
  onChange,
  ...props
}) => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  const [parentSizes, setParentSizes] = useState({ width: 0, height: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setParentSizes({ width, height });
  };

  return (
    <View onLayout={handleLayout}>
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
          commonStyles.flexStyles.rowCenter,
          {
            flex: 1,
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            alignItems: "center",
          },
        ]}
      >
        <MultiSlider
          values={value || [0, 1000000]}
          onValuesChange={(values) => onChange(values)} // Değer değişikliği
          min={0} // Minimum değer
          max={1000000} // Maksimum değer
          step={100} // Adım büyüklüğü
          enableLabel={true}
          customLabel={({
            oneMarkerValue,
            oneMarkerLeftPosition,
            twoMarkerLeftPosition,
            twoMarkerValue,
          }) => {
            return (
              <>
                <View
                  style={[
                    themedStyles.cardStyles.default,
                    {
                      paddingVertical: 0,
                      paddingHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                      height: APP_STYLE_VALUES.WH_SIZES.xs2,
                      position: "absolute",
                      left:
                        oneMarkerLeftPosition -
                        (APP_STYLE_VALUES.WH_SIZES.xl3 -
                          APP_STYLE_VALUES.SPACE_SIZES.sp2) /
                          2,
                      width: APP_STYLE_VALUES.WH_SIZES.xl3,
                    },
                  ]}
                >
                  <TextStyled
                    textAlignment="center"
                    fontSize="md"
                    fontWeight="regular"
                  >
                    {oneMarkerValue}
                  </TextStyled>
                </View>

                <View
                  style={[
                    themedStyles.cardStyles.default,
                    {
                      paddingVertical: 0,
                      paddingHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                      height: APP_STYLE_VALUES.WH_SIZES.xs2,
                      position: "absolute",
                      left:
                        twoMarkerLeftPosition -
                        (APP_STYLE_VALUES.WH_SIZES.xl3 -
                          APP_STYLE_VALUES.SPACE_SIZES.sp2) /
                          2,
                      width: APP_STYLE_VALUES.WH_SIZES.xl3,
                    },
                  ]}
                >
                  <TextStyled
                    textAlignment="center"
                    fontSize="md"
                    fontWeight="regular"
                  >
                    {twoMarkerValue}
                  </TextStyled>
                </View>
              </>
            );
          }}
          sliderLength={
            parentSizes.width -
            APP_STYLE_VALUES.WH_SIZES.xl -
            APP_STYLE_VALUES.SPACE_SIZES.sp2 * 2
          }
          selectedStyle={{
            backgroundColor: theme.primary,
          }}
          unselectedStyle={{
            backgroundColor: theme.grayScale200,
          }}
          markerStyle={{
            backgroundColor: theme.primary,
            height: 20,
            width: 20,
            borderRadius: 10,
          }}
          containerStyle={{
            justifyContent: "flex-end",
            flex: 1,
            width: "100%",
            height: APP_STYLE_VALUES.WH_SIZES.md,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
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
