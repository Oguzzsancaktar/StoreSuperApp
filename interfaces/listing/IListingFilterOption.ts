import EListingFilterOptionComponentType from "../enums/EListingFilterOptionComponentType"
import IListingCategory from "./IListingCategory"

export default interface IListingFilterOption {
  categoryId: IListingCategory["id"]
  id: string
  name: string
  propertyName: string
  optionViewingType: number
  propertyType: string
  validationRules?: any
  values: any[]
  categoryOptionId: string
  dependentName?: string
  filterType: EListingFilterOptionComponentType
  placeholder?: string
}
