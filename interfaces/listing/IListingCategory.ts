interface IListingCategory {
  id: string
  banner: string
  hasChild: boolean
  icon: string
  name: string
  parentCategoryId?: string
  subCategoryTitle: string
}

export default IListingCategory
