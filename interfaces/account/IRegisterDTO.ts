export default interface IRegisterDTO {
  firstName: string,
  lastName: string,
  email: string
  phoneNumber: string,
  userName: string,
  password: string,
  confirmPassword?: string,
  language: string
}
