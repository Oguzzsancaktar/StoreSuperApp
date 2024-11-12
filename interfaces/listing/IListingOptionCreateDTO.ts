import IListingCategoryOption from "./IListingCategoryOption";

export default interface IListingOptionCreateDTO {
  categoryOptionId: IListingCategoryOption["id"],
  value: number
  categoryOptionValueId: string,
  categoryOptionValueIds: any[]
}
