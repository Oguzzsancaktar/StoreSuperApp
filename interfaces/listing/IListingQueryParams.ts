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
  subCategoryId?: IListingCategorySub["id"]
  subCategoryIds?: IListingCategorySub["id"][]
  filters?: any[]
  vehicleshpae?: any
  color?: any
  numberofdoors?: any
  fueltype?: any
  transmission?: any
  enginepower?: any
  mileage?: any
  registration?: any
  purpose?: any
  surface?: any
  numberOfFloors?: any
  year?: any
  furnished?: boolean
  details?: any
  numberOfRooms?: any
  numberOfBathrooms?: any
}


export default IListingQueryParams
