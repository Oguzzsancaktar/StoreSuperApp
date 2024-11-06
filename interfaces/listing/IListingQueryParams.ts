import IQueryParams from "../app/IQueryParams";
import IListingCategory from "./IListingCategory";

interface IListingQueryParams extends IQueryParams {
  categoryId: IListingCategory["id"]
  maxPrice?: number
}


export default IListingQueryParams
