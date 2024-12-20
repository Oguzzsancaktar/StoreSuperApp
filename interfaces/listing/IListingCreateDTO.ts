import IAddress from "../common/address/IAddress";
import ITranslationItem from "../common/localization/ITranslationItem";
import IListingCategory from "./IListingCategory";
import IListingOptionCreateDTO from "./IListingOptionCreateDTO";
import IListingPrice from "./IListingPrice";

export default interface IListingCreateDTO {
  categoryId: IListingCategory["id"]
  price: IListingPrice
  options: IListingOptionCreateDTO[]
  isActive: boolean
  isDraft: boolean
  allowPhoneCalls: boolean
  allowMessaging: boolean
  negotiable: boolean

  address: IAddress

  media: string[],
  tags: string[],
  coverImage: string

  translations: ITranslationItem[]

}



