import IUser from "../account/IUser"
import IAddress from "../common/address/IAddress"
import IListingCategory from "./IListingCategory"
import IListingPostMedia from "./IListingPostMedia"

interface IListingPost {
  allowMessaging: boolean
  allowPhoneCalls: boolean
  amountFavorite: number
  boost: { listingId: "00000000-0000-0000-0000-000000000000" }
  category?: IListingCategory
  categoryId?: IListingCategory["id"]
  categories: IListingCategory[]
  companyId?: string
  created: Date
  description: string
  formattedPrice: string
  id: string
  isActive: boolean
  isDraft: boolean
  listingAddress: IAddress
  media: IListingPostMedia[]
  name: string
  negotiable: boolean
  options: any[] // @todo
  price: { currency: "MKD", amount: 322332 }
  status: number
  tags: string[]
  user: IUser
  userId: string
  isFavorite: boolean
}

export default IListingPost
