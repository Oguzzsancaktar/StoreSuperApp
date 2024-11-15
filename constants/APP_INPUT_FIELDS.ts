import { IInputProps } from "@/interfaces/app"


const INPUT_FISTNAME: IInputProps = {
  label: 'Firstname',
  name: 'firstname',
  placeholder: 'Enter your firstname...',
  type: 'text',
  required: true,
}


const INPUT_LASTNAME: IInputProps = {
  label: 'Lastname',
  name: 'lastname',
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

const APP_INPUT_FIELDS = {
  INPUT_EMAIL,
  INPUT_PASSWORD,
  INPUT_PASSWORD_CONFIRM
}

export default APP_INPUT_FIELDS
