import EListingOptionComponentType from '@/interfaces/enums/EListingOptionComponentType';
import { TextInput, ViewProps } from "react-native"
import ISelectOption from "../theme/ISelectOption"

export default interface IInputProps {
  name: string
  type: keyof typeof EListingOptionComponentType
  customStyle?: ViewProps
  required: boolean
  label?: string
  options?: ISelectOption[]
  placeholder?: React.ComponentProps<typeof TextInput>["placeholder"]
  maxMedia?: number
}
