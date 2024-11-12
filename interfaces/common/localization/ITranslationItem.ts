import ETranslationLanguages from "@/interfaces/enums/ELanguages";

export default interface ITranslationItem {
  language: ETranslationLanguages,
  title: string,
  description: string
}
