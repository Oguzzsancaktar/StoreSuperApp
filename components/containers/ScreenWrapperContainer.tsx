import { View } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import { ButtonGoBack } from '../button';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';
import { TextStyled } from '../typography';

export interface IScreenWrapperContainerProps {
  children?: React.ReactNode;
  showGoBack?: boolean;
  headerTitle?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  showBorderUnderline?: boolean;
  isTabBarActive?: boolean;
  customGoBackEvent?: () => void;
}
const ScreenWrapperContainer: React.FC<IScreenWrapperContainerProps> = ({
  children,
  showGoBack = false,
  leftElement,
  headerTitle,
  rightElement,
  showBorderUnderline,
  isTabBarActive,
  customGoBackEvent,
}) => {
  const themedStyles = useThemedStyles();
  const commonStyles = useCommonStyles();
  return (
    <View style={[themedStyles.containerStyles.screenWrapperContainer]}>
      {(showGoBack || headerTitle || rightElement) && (
        <View
          style={[
            commonStyles.flexStyles.rowBetween,
            showBorderUnderline && themedStyles.borderStyles.bottomUnderline,
            {
              paddingHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp4,
              paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            },
          ]}
        >
          <View style={[commonStyles.flexStyles.rowStart]}>
            {showGoBack && (
              <ButtonGoBack
                customEvent={customGoBackEvent}
                isCircular={false}
              />
            )}

            <View
              style={[
                commonStyles.flexStyles.rowStart,
                {
                  gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                  height: APP_STYLE_VALUES.WH_SIZES.md,
                },
              ]}
            >
              {leftElement && leftElement}

              {headerTitle && (
                <View>
                  <TextStyled
                    fontSize="h5"
                    fontWeight="semibold"
                    customColor="grayScale900"
                  >
                    {headerTitle}
                  </TextStyled>
                </View>
              )}
            </View>
          </View>
          <View>{rightElement}</View>
        </View>
      )}

      <View
        style={[
          {
            ...themedStyles.containerStyles.screenWrapperContainer,
            marginBottom: isTabBarActive
              ? APP_STYLE_VALUES.SPACE_SIZES.sp20
              : 0,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export default ScreenWrapperContainer;
