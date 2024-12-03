import IUser from "../account/IUser";

export default interface IChatConversation {
  chatRegistryId: string,
  listingId: string,
  coverImage: string,
  name: string,
  userId: IUser["id"],
  listingTitle: string,
  date: Date,
  time: string,
  lastMessageSenderId: string,
  lastMessage: string,
  dateTimeForSorting: Date
}
