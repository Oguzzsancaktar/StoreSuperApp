import IRegisterDTO from "./IRegisterDTO"
import IUser from "./IUser"

export default interface IPassordUpdateDTO {
  userId: IUser["id"]
  password: IRegisterDTO["password"]
  newPassword: IRegisterDTO["confirmPassword"]
  confirmNewPassword: IRegisterDTO["password"]
}
