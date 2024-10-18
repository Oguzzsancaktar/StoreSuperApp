import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import useCommonStyles from '@/hooks/useCommonStyles';
import { SignupForm } from '@/components/form';
import { SignupFormStepProps } from '@/components/form/SignupForm';
import { TextStyled } from '@/components/typography';
import { View } from 'react-native';
import SLoginIllustration from '@/components/svg/illustrations/SLoginIllustration';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';

const SigninScreen = () => {
  const commonStyles = useCommonStyles();

  const steps: SignupFormStepProps[] = [
    {
      id: 'STEP_1',
      fields: [
        {
          label: 'First name',
          name: 'firstname',
          placeholder: 'Your email address',
          type: 'text',
        },
        {
          label: 'Password',
          name: 'password',
          placeholder: 'Your password',
          type: 'password',
        },
      ],
    },
  ];
  const defaultValues = { COUNTRY: 'Estonia' };

  const handleSubmit = (values: Record<string, any>) => {
    console.log(values);
  };

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <View style={{ paddingTop: APP_STYLE_VALUES.SPACE_SIZES.sp5 }}>
        <View
          style={{ maxWidth: APP_STYLE_VALUES.MAX_WIDTH.lg, margin: 'auto' }}
        >
          <TextStyled fontSize="h4" fontWeight="bold" customColor="primary">
            With Setuka24 you list with Ease & find with purpose
          </TextStyled>
          <TextStyled fontSize="md" fontWeight="semibold">
            Login into your account, to find cool things in your area or sell
            your own stuff.
          </TextStyled>
        </View>

        <SLoginIllustration />
      </View>

      <InnerCommonContainer>
        <SignupForm
          steps={steps}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default SigninScreen;
