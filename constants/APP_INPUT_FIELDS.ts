import { IInputProps } from "@/interfaces/app"


const INPUT_FISTNAME: IInputProps = {
  label: "input.firstName.label",
  name: 'firstName',
  placeholder: "input.firstName.placeholder",
  type: 'text',
  required: true,
}


const INPUT_LASTNAME: IInputProps = {
  label: "input.lastName.label",
  name: 'lastName',
  placeholder: "input.lastName.placeholder",
  type: 'text',
  required: true,
}


const INPUT_USERNNAME: IInputProps = {
  label: "input.username.label",
  name: 'username',
  placeholder: "input.username.placeholder",
  type: 'text',
  required: true,
}

const INPUT_EMAIL: IInputProps = {
  label: "input.email.label",
  name: 'email',
  placeholder: "input.email.placeholder",
  type: 'text',
  required: true,
}


const INPUT_PHONE: IInputProps = {
  label: "input.phoneNumber.label",
  name: 'phoneNumber',
  placeholder: "input.phoneNumber.placeholder",
  type: 'number',
  required: true,
}

const INPUT_BIRTHDAY: IInputProps = {
  label: "input.birthday.label",
  name: 'birthday',
  placeholder: "input.birthday.placeholder",
  type: 'date',
  required: true,
}


const INPUT_OLD_PASSWORD: IInputProps = {
  label: "input.passwordOld.label",
  name: 'oldPassword',
  placeholder: "input.passwordOld.placeholder",
  type: 'password',
  required: true,
}


const INPUT_PASSWORD: IInputProps = {
  label: "input.password.label",
  name: 'password',
  placeholder: "input.password.placeholder",
  type: 'password',
  required: true,
}

const INPUT_PASSWORD_CONFIRM: IInputProps = {
  label: "input.passwordConfirm.label",
  name: 'confirmPassword',
  placeholder: "input.passwordConfirm.placeholder",
  type: 'password',
  required: true,
}


const INPUT_EULA_AGREEMENT: IInputProps = {
  label: "input.eula.label",
  name: 'eulaAgreement',
  placeholder: "input.eula.placeholder",
  type: 'checkbox',
  required: true,
}


const INPUT_SELECT_LANGUAGE: IInputProps = {
  label: "input.language.label",
  name: 'language',
  placeholder: "input.language.placeholder",
  type: 'select',
  options: [
    { label: "English", value: "en" },
    { label: "Deutsch", value: "de" },
    { label: "Македонски", value: "mk" },
    { label: "Bosanski", value: "bs" }
  ],
  required: true,
}



const APP_INPUT_FIELDS = {
  INPUT_EMAIL,
  INPUT_PHONE,
  INPUT_OLD_PASSWORD,
  INPUT_PASSWORD,
  INPUT_PASSWORD_CONFIRM,
  INPUT_USERNNAME,
  INPUT_FISTNAME,
  INPUT_LASTNAME,
  INPUT_BIRTHDAY,
  INPUT_SELECT_LANGUAGE,
  INPUT_EULA_AGREEMENT
}

export default APP_INPUT_FIELDS
