import IUser from "@/interfaces/account/IUser"

export default interface IJwtDecodedUser {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "174f04e2-168e-4431-89ea-58e0477800a4",
  "Id": IUser["id"],
  "Email": "Oguztahasancaktar@gmail.com",
  "fullName": "Oğuz Sancaktar",
  "Name": "Oğuz",
  "Surname": "Sancaktar",
  "MobilePhone": "",
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "User",
  "RegistrationType": string
  exp: number
}
