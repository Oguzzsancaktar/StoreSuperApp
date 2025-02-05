import ETranslationLanguages from "@/interfaces/enums/ETranslationLanguages";

export default interface ITranslationItem {
  language: keyof typeof ETranslationLanguages,
  title: string,
  description: string
}
