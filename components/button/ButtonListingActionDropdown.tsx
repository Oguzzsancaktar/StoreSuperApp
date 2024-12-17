import ImageIconCircle from '../images/ImageIconCircle';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import IconOptions from '../svg/icon/IconOptions';
import { useAppTheme } from '@/contexts/ThemeContext';
import ISelectOption from '@/interfaces/theme/ISelectOption';
import InputSelectStyled from '../input/InputSelectStyled';
import { View } from 'react-native';
import IListingPost from '@/interfaces/listing/IListingPost';
import { Href, router } from 'expo-router';
import { useDeleteListingMutation } from '@/services/listingServices';
import { toastSuccess } from '@/utils/toastUtils';

const data = [
  { label: 'Visit Profile', value: 'profile' },
  { label: 'Delete Listing', value: 'delete' },
  // { label: 'Edit Listing', value: 'edit' },
];

interface IProps {
  post: IListingPost;
}
const ButtonListingActionDropdown: React.FC<IProps> = ({ post }) => {
  const { theme } = useAppTheme();
  const [deleteListing] = useDeleteListingMutation();

  const handleSelect = async (item: ISelectOption) => {
    switch (item.value) {
      case 'profile':
        router.push(('/(drawer)/' + post?.user?.id) as Href);
        break;
      case 'delete':
        await deleteListing(post.id);
        toastSuccess('Listing deleted successfully.');
        break;
      case 'edit':
        alert('Paylaş');
        break;

      default:
        break;
    }
  };

  // @todo padding need to be dynamic define variant

  return (
    <View style={{ width: APP_STYLE_VALUES.WH_SIZES.md }}>
      <InputSelectStyled
        renderRightIcon={() => (
          <ImageIconCircle
            bgColor="transparent"
            size={APP_STYLE_VALUES.WH_SIZES.xs}
            icon={
              <IconOptions
                width={APP_STYLE_VALUES.WH_SIZES.xs2}
                height={APP_STYLE_VALUES.WH_SIZES.xs2}
                color={theme.grayScale500}
              />
            }
          />
        )}
        containerStyle={{ width: APP_STYLE_VALUES.WH_SIZES.xl6 }}
        options={data}
        handleSelect={handleSelect}
        variant="transparent"
      />
    </View>
  );
};
export default ButtonListingActionDropdown;
