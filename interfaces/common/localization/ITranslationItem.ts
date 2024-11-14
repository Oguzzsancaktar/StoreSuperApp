import ETranslationLanguages from "@/interfaces/enums/ELanguages";

export default interface ITranslationItem {
  language: keyof typeof ETranslationLanguages,
  title: string,
  description: string
}
