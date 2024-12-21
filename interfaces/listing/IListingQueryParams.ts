import IQueryParams from "../app/IQueryParams";
import ICountry from "../common/address/ICountry";
import IDistrict from "../common/address/IDistrict";
import IListingCategory from "./IListingCategory";
import IListingCategorySub from "./IListingCategorySub";

interface IListingQueryParams extends IQueryParams {
  categoryId: IListingCategory["id"]
  maxPrice?: number
  minPrice?: number
  query?: string
  modelIds?: any[]
  countryId?: ICountry["id"]
  cityId?: ICountry["id"]
  districtId?: IDistrict["id"]
  subCategoryIds?: IListingCategorySub["id"][]
  filters?: any[]
  details?: any[]

}


export default IListingQueryParams
