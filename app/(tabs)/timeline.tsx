import { View } from 'react-native';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import FilterSearchbar from '@/components/filters/FilterSearchbar';
import FilterStuffType from '@/components/filters/FilterStuffType';
import CardMostSearchedWords from '@/components/cards/CardMostSearchedWords';
import CardNewestPostings from '@/components/cards/CardNewestPostings';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import { InnerCommonContainer } from '@/components/containers';
import useThemedStyles from '@/hooks/useThemedStyles';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

export default function TimelineScreen() {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();

  const [showMostSearched, setShowMostSearched] = useState(false);

  return (
    <ScreenWrapperContainer>
      <InnerCommonContainer>
        <CardNewestPostings />
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
}
