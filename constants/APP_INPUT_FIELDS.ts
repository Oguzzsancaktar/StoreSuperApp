import { IInputProps } from "@/interfaces/app"


const INPUT_FISTNAME: IInputProps = {
  label: 'Firstname',
  name: 'firstName',
  placeholder: 'Enter your firstname...',
  type: 'text',
  required: true,
}


const INPUT_LASTNAME: IInputProps = {
  label: 'Lastname',
  name: 'lastName',
  placeholder: 'Enter your lastname...',
  type: 'text',
  required: true,
}


const INPUT_USERNNAME: IInputProps = {
  label: 'Username',
  name: 'username',
  placeholder: 'Enter your username...',
  type: 'text',
  required: true,
}

const INPUT_EMAIL: IInputProps = {
  label: 'Email Adress',
  name: 'email',
  placeholder: 'Enter your email address...',
  type: 'text',
  required: true,
}


const INPUT_PHONE: IInputProps = {
  label: 'Phone Number',
  name: 'phoneNumber',
  placeholder: 'Enter your phone number...',
  type: 'number',
  required: true,
}

const INPUT_BIRTHDAY: IInputProps = {
  label: 'Birthday',
  name: 'birthday',
  placeholder: 'Enter your birthday...',
  type: 'date',
  required: true,
}


const INPUT_OLD_PASSWORD: IInputProps = {
  label: 'Old Password',
  name: 'oldPassword',
  placeholder: 'Your old password...',
  type: 'password',
  required: true,
}


const INPUT_PASSWORD: IInputProps = {
  label: 'Password',
  name: 'password',
  placeholder: 'Your password...',
  type: 'password',
  required: true,
}

const INPUT_PASSWORD_CONFIRM: IInputProps = {
  label: 'Password Confirm',
  name: 'confirmPassword',
  placeholder: 'Confirm your password...',
  type: 'password',
  required: true,
}

const INPUT_SELECT_LANGUAGE: IInputProps = {
  label: 'Language',
  name: 'language',
  placeholder: 'Select language...',
  type: 'select',
  options: [
    { label: "English", value: "en" },
    { label: "Deutsch", value: "de" },
    { label: "Türkçe", value: "tr" },
    { label: "Arabic", value: "ar" },
  ],
  required: true,
}


const INPUT_EULA_AGREEMENT: IInputProps = {
  label: 'Accept Terms and Conditions',
  placeholder: "End User License Agreement By accessingor using Setuka24, you agree to be bound by the terms and conditions of this EULA.",
  name: 'eulaAgreement',
  type: 'checkbox',
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
