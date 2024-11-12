import EListingOptionComponentType from "../enums/EListingOptionComponentType"
import IListingCategory from "./IListingCategory"

export default interface IListingCategoryOption {
  apiUrl?: string
  categoryId: IListingCategory["id"]
  id: string
  isDefault: boolean
  name: string
  optionViewingType: number //@todo - enum
  propertyType: EListingOptionComponentType
  validation?: any
  values: any[]
}
