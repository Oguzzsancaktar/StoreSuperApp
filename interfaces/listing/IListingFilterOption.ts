import EListingFilterOptionComponentType from "../enums/EListingFilterOptionComponentType"
import EListingOptionComponentType from "../enums/EListingOptionComponentType"
import IListingCategory from "./IListingCategory"

export default interface IListingFilterOption {
  categoryId: IListingCategory["id"]
  id: string
  name: string
  propertyName: string
  optionViewingType: number //@todo - enum
  propertyType: string
  validationRules?: any
  values: any[]
  categoryOptionId: string
  dependentName?: string
  filterType: EListingFilterOptionComponentType
  placeholder?: string
}
