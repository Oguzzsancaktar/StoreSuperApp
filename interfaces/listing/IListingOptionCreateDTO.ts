import IListingCategoryOption from "./IListingCategoryOption";

export default interface IListingOptionCreateDTO {
  categoryOptionId: IListingCategoryOption["id"],
  value?: string | boolean  // @TODO number - boolean
  categoryOptionValueId?: string,
  categoryOptionValueIds?: string[]
}
