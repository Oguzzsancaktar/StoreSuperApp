interface IListingCategory {
  id: string
  banner: string
  hasChild: boolean
  icon: string
  name: string
  parentCategoryId?: string // defpend other @todo
  subCategoryTitle: string
}

export default IListingCategory
