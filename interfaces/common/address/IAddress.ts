import ICity from "./ICity";
import ICountry from "./ICountry";

export default interface IAddress {
  districtId: ICountry["id"], // @todo
  countryId: ICountry["id"],
  cityId: ICity["id"],
  fullAddress: string,
  zipCode: number,
  districtName: string,
  cityName: string,
  countryName: string,
  showFullAddress: boolean,
  longitude: number,
  latitude: number
}
