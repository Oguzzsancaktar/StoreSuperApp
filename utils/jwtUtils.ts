import IJwtDecodedUser from "@/interfaces/common/jwt/IJwtDecodedUser";
import { jwtDecode } from "jwt-decode";

const userJwtDecode = (token: string): IJwtDecodedUser => {
  const decodedToken = jwtDecode<IJwtDecodedUser>(token);
  return decodedToken
}


const jwtUtils = {
  userJwtDecode
}

export default jwtUtils
