import IListingCategory from "./IListingCategory"
import IListingPostMedia from "./IListingPostMedia"
import IListingPostOption from "./IListingPostOption"

interface IListingPost {
  allowMessaging: boolean
  allowPhoneCalls: boolean
  amountFavorite: number
  boost: { listingId: "00000000-0000-0000-0000-000000000000" }
  category?: IListingCategory
  categoryId?: IListingCategory["id"]
  companyId: null
  created: Date
  description: string
  formattedPrice: string
  id: string
  isActive: boolean
  isDraft: boolean
  listingAddress?: string
  media: IListingPostMedia[]
  name: string
  negotiable: boolean
  options: IListingPostOption[]
  price: { currency: "MKD", amount: 322332 }
  status: number
  tags: string[]
  user: null
  userId: null
}

export default IListingPost
