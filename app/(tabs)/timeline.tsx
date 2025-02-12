import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import CardNewestPostings from '@/components/cards/CardNewestPostings';
import { InnerCommonContainer } from '@/components/containers';

export default function TimelineScreen() {
  return (
    <ScreenWrapperContainer>
      <InnerCommonContainer>
        <CardNewestPostings />
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
}
