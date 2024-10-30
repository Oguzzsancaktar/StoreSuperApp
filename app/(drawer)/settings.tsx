import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import useCommonStyles from '@/hooks/useCommonStyles';
import { SignupForm } from '@/components/form';
import { SignupFormStepProps } from '@/components/form/SignupForm';
import { TextStyled } from '@/components/typography';
import { TouchableOpacity, View } from 'react-native';
import SLoginIllustration from '@/components/svg/illustrations/SLoginIllustration';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { InputStyled } from '@/components/input';
import IconTheme from '@/components/svg/icon/IconTheme';
import { useAppTheme } from '@/contexts/ThemeContext';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <InnerCommonContainer>
        <TouchableOpacity onPress={toggleTheme}>
          <IconTheme />
        </TouchableOpacity>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default SettingsScreen;
