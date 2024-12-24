import IListingCategoryOption from "./IListingCategoryOption";

export default interface IListingOptionCreateDTO {
  categoryOptionId: IListingCategoryOption["id"],
  value?: string | boolean | null
  categoryOptionValueId?: string | null,
  categoryOptionValueIds?: string[]
}
