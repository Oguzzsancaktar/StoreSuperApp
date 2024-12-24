import { filter } from 'lodash';
import APP_VALIDATION_PATTERNS from "@/constants/APP_VALIDATION_PATTERNS";
import { RegisterOptions } from "react-hook-form";

type ICommonFiledNames = "firstname" | "email" | "password" | "password_confirm" | "price" | "zipcode" | "media"

const getFormRulesFromField = (field: ICommonFiledNames): Omit<RegisterOptions<Record<string, any>, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined => {
  const formFieldRule: RegisterOptions<Record<string, any>, string> = {
    required: false,
  }

  switch (field) {
    case 'firstname':
      formFieldRule.pattern = APP_VALIDATION_PATTERNS.USERNAME_PATTERN;
      break;
    case 'email':
      formFieldRule.pattern = APP_VALIDATION_PATTERNS.EMAIL_PATTERN;
      break;
    case 'password':
      formFieldRule.pattern = APP_VALIDATION_PATTERNS.PASSWORD_PATTERN;
      break;
    case 'password_confirm':
      formFieldRule.pattern = APP_VALIDATION_PATTERNS.PASSWORD_PATTERN;
      break;
    case 'price':
      formFieldRule.pattern = APP_VALIDATION_PATTERNS.PRICE_PATTERN;
      break;

    case 'zipcode':
      formFieldRule.pattern = APP_VALIDATION_PATTERNS.POSTAL_CODE_PATTERN;
      break;

    case "media":
      formFieldRule.validate = media => filter(media, (m) => m).length > 0 || 'Please upload at least one image.'
      break;

    default:
      break;
  }

  return formFieldRule
}

const validationUtils = {
  getFormRulesFromField
}

export default validationUtils
