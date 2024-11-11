import IListingCategory from "./IListingCategory"

export default interface IListingCategorySub {
  banner: null
  hasChild: boolean
  icon: null
  id: string
  name: string
  parentCategoryId: IListingCategory["id"]
  subCategoryTitle: null
}
