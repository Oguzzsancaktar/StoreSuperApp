import React, { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, TouchableOpacity, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

import { filter, findIndex, forEach, map } from "lodash";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { COMMON_COLOURS } from "@/constants/APP_THEMES";
import useAppStyles from "@/hooks/useAppStyles";

import ImageIconCircle from "../images/ImageIconCircle";
import ImageStyled from "../images/ImageStyled";
import IconTrash from "../svg/icon/IconTrash";
import IconUpload from "../svg/icon/IconUpload";
import { TextStyled } from "../typography";

interface ImagePickerResponse {
  uri: string;
  name: string;
  type: string;
}

interface IProps {
  value?: (ImagePickerResponse | undefined)[];
  maxMedia?: number;
  label?: string;
  onChange(selectedImages: (ImagePickerResponse | undefined)[]): void;
  isUploadButton?: boolean;
}

const InputImageUploader: React.FC<IProps> = ({
  maxMedia = 1,
  value,
  label,
  onChange,
  isUploadButton = false,
}) => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  const [selectedImages, setSelectedImages] = useState<
    (ImagePickerResponse | undefined)[]
  >(value || Array(maxMedia));

  const avaliableSelectionCount = useMemo(() => {
    const definedSelections = filter(selectedImages, (s) => s);
    return maxMedia - definedSelections.length;
  }, [selectedImages, maxMedia]);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: avaliableSelectionCount,
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          Alert.alert("Cancelled", "Image selection was cancelled");
        } else if (response.errorCode) {
          Alert.alert("Error", response.errorMessage || "Unknown error");
        } else if (response.assets && response.assets.length > 0) {
          let oldImages = [...selectedImages];

          const newImages = map(response.assets, (asset) => ({
            uri: asset.uri || "",
            name: asset.fileName || "image.jpg",
            type: asset.type || "image/jpeg",
          }));

          forEach(newImages, (newImg) => {
            const undefinedIndex = findIndex(oldImages, (oldImg) => !oldImg);
            oldImages[undefinedIndex] = newImg;
          });

          if (maxMedia === 1) {
            setSelectedImages(() => [...newImages]);
          } else {
            setSelectedImages(() => [...oldImages]);
          }
        }
      },
    );
  };

  const handleRemove = (index: number) => {
    let oldImages = [...selectedImages];

    oldImages[index] = undefined;

    setSelectedImages([...oldImages]);
  };

  useEffect(() => {
    onChange(selectedImages);
  }, [selectedImages]);

  return isUploadButton ? (
    <ImageIconCircle
      icon={<IconUpload color={theme.white} />}
      onPress={pickImage}
    />
  ) : selectedImages.length === 0 ? (
    <Pressable
      onPress={pickImage}
      style={[
        commonStyles.flexStyles.colBetween,
        themedStyles.borderStyles.dashedGray,
        {
          overflow: "visible",
          backgroundColor: COMMON_COLOURS.primaryOpacity05,
          borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.lg,
          height: APP_STYLE_VALUES.WH_SIZES.xl8,
          paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2,
        },
      ]}
    >
      {/* <Button title="Pick an Image"/> */}
      <View />

      <View
        style={[
          commonStyles.flexStyles.colCenter,
          { gap: APP_STYLE_VALUES.SPACE_SIZES.sp1 },
        ]}
      >
        <IconUpload color={theme.grayScale600} />
        <TextStyled fontSize="sm" fontWeight="medium">
          Upload Images
        </TextStyled>
      </View>

      <View>
        <TextStyled fontSize="sm" fontWeight="medium">
          {label || "You can continue without upload..."}
        </TextStyled>
        <TextStyled fontSize="xs" fontWeight="regular">
          Maximum: {maxMedia + ""}
        </TextStyled>
      </View>
    </Pressable>
  ) : (
    <View>
      <View
        style={[
          commonStyles.flexStyles.rowBetween,
          { marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
        ]}
      >
        {label && (
          <View
            style={{
              marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
              marginLeft: APP_STYLE_VALUES.SPACE_SIZES.sp1,
            }}
          >
            <TextStyled textAlignment="left" fontSize="md" fontWeight="regular">
              {label || "You can continue without upload..."}
            </TextStyled>
          </View>
        )}
        <View>
          <TextStyled fontSize="xs" fontWeight="regular">
            Maximum: {maxMedia + ""}
          </TextStyled>
        </View>
      </View>
      <View
        style={[
          commonStyles.flexStyles.rowWrap,
          { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
        ]}
      >
        {map(selectedImages, (image, index) => {
          return image ? (
            <View
              key={index}
              style={[
                themedStyles.borderStyles.dashedGray,
                {
                  flex: 1,
                  borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.md,
                  height: APP_STYLE_VALUES.WH_SIZES.xl4,
                  minWidth: APP_STYLE_VALUES.WH_SIZES.xl4,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => handleRemove(index)}
                style={[
                  commonStyles.absolutePositionStyles.absoluteFill,
                  {
                    zIndex: 9,
                    left: "auto",
                    top: "auto",
                  },
                ]}
              >
                <ImageIconCircle
                  size={APP_STYLE_VALUES.WH_SIZES.xs2}
                  bgColor="error"
                  icon={
                    <IconTrash
                      width={APP_STYLE_VALUES.WH_SIZES.xs3}
                      height={APP_STYLE_VALUES.WH_SIZES.xs3}
                      color={theme.white}
                    />
                  }
                />
              </TouchableOpacity>
              <ImageStyled key={index} url={image.uri} />
            </View>
          ) : (
            <Pressable
              key={index}
              onPress={pickImage}
              style={[
                themedStyles.borderStyles.dashedGray,
                commonStyles.flexStyles.colCenter,
                {
                  flex: 1,
                  height: APP_STYLE_VALUES.WH_SIZES.xl4,
                  borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.md,
                  minWidth: APP_STYLE_VALUES.WH_SIZES.xl4,
                },
              ]}
            >
              <IconUpload color={theme.grayScale600} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default InputImageUploader;
