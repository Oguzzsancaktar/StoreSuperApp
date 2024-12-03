import IListingPost from "../listing/IListingPost";
import IChatMessage from "./IChatMessage";

export default interface IChatCreateDTO {
  listingId: IListingPost["id"],
  message: IChatMessage["message"]
}
