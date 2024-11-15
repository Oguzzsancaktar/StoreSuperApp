import IRegisterDTO from "./IRegisterDTO";

export default interface ILoginDTO extends Pick<IRegisterDTO, "email" | "password"> { }
