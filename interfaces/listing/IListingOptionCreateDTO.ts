import IListingCategoryOption from "./IListingCategoryOption";

export default interface IListingOptionCreateDTO {
  categoryOptionId: IListingCategoryOption["id"],
  value?: string | boolean | null  // @TODO number - boolean
  categoryOptionValueId?: string | null,
  categoryOptionValueIds?: string[]
}
