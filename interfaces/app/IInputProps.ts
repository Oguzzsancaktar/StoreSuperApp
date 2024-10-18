import { TextInput } from "react-native"

export default interface IInputProps {
  name: string
  type: 'text' | 'password' | 'number'
  label?: string
  placeholder?: React.ComponentProps<typeof TextInput>["placeholder"]
}
