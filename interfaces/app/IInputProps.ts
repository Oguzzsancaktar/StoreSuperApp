import { TextInput } from "react-native"
import ISelectOption from "../theme/ISelectOption"

export default interface IInputProps {
  name: string
  type: 'text' | 'password' | 'number' | "textarea" | "select" | "upload" | "checkbox"
  label?: string
  options?: ISelectOption[]
  placeholder?: React.ComponentProps<typeof TextInput>["placeholder"]
  maxMedia?: number
}
