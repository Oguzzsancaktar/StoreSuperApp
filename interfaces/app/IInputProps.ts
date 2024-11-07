import { TextInput } from "react-native"

export default interface IInputProps {
  name: string
  type: 'text' | 'password' | 'number' | "textarea" | "select" | "upload" | "checkbox"
  label?: string
  placeholder?: React.ComponentProps<typeof TextInput>["placeholder"]
}
