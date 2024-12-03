import IUser from "../account/IUser";

export default interface IChatMessage {
  senderId: IUser["id"],
  receiverId: IUser["id"],
  time: string,
  date: Date,
  message: string
}
