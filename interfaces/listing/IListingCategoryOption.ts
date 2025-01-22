import EListingOptionComponentType from "../enums/EListingOptionComponentType"
import IListingCategory from "./IListingCategory"

export default interface IListingCategoryOption {
  apiUrl?: string
  categoryId: IListingCategory["id"]
  id: string
  isDefault: boolean
  name: string
  propertyName: | 'price'
  | 'address'
  | 'subCategoryId'
  | 'subCategoryIds'
  | 'purpose'
  | 'surface'
  | 'year'
  | 'numberOfFloors'
  | 'furnished'
  | 'details'
  | 'numberOfRooms'
  | 'numberOfBathrooms';
  optionViewingType: number
  propertyType: EListingOptionComponentType
  validation?: any
  values: any[]
}
