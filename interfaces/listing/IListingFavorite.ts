import IUser from "../account/IUser"
import IListingPost from "./IListingPost"

export default interface IListingFavorite {
  created: Date
  id: string
  listing: IListingPost
  userId: IUser["id"]
}
