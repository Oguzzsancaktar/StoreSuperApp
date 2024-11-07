import BANNER_PROFILE_DEFAULT from '@/assets/images/banner/banner-profile-default.jpg'
import LISTING_ESTATE_DEFAULT from '@/assets/images/listing/listing-estate-default.jpg'

import { ImageSourcePropType } from 'react-native'

const APP_IMAGES: Record<string, ImageSourcePropType> = {
  BANNER_PROFILE_DEFAULT,
  LISTING_ESTATE_DEFAULT
}

const useAppImages = () => APP_IMAGES
export type IAppImages = keyof typeof APP_IMAGES

export default useAppImages
