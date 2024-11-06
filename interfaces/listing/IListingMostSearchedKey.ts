import IListingCategory from "./IListingCategory"

interface IListingMostSearchedKey {
  categoryId: IListingCategory["id"]
  keyword: string
}

export default IListingMostSearchedKey
