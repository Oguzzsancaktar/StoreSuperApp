import { View } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import { ButtonGoBack } from '../button';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';
import { TextStyled } from '../typography';

interface IProps {
  children?: React.ReactNode;
  showGoBack?: boolean;
  headerTitle?: string;
  rightElement?: React.ReactNode;
  showBorderUnderline?: boolean;
}
const ScreenWrapperContainer: React.FC<IProps> = ({
  children,
  showGoBack = false,
  headerTitle,
  rightElement,
  showBorderUnderline,
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
              marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            },
          ]}
        >
          <View style={[commonStyles.flexStyles.rowStart]}>
            {showGoBack && <ButtonGoBack isCircular={false} />}
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
          <View>{rightElement}</View>
        </View>
      )}

      <View
        style={[
          {
            ...themedStyles.containerStyles.screenWrapperContainer,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export default ScreenWrapperContainer;
