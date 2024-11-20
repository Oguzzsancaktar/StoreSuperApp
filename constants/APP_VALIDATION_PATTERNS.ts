const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

// 1. URL
const URL_PATTERN = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

// 2. Telefon numarası (uluslararası format)
const PHONE_PATTERN = /^\+?[1-9]\d{1,14}$/;

// 3. Türkiye telefon numarası (10 haneli)
const TR_PHONE_PATTERN = /^0?5\d{9}$/;

// 4. Posta kodu (5 rakam)
const POSTAL_CODE_PATTERN = /^\d{5}$/;

// 5. Sadece sayılar
const NUMERIC_PATTERN = /^\d+$/;

// 6. Sadece harfler (alfabetik karakterler)
const ALPHA_PATTERN = /^[A-Za-z]+$/;

// 7. Harfler ve sayılar (alfanümerik karakterler)
const ALPHANUMERIC_PATTERN = /^[A-Za-z0-9]+$/;

// 8. Şifre (en az bir büyük harf, bir küçük harf ve bir rakam içermeli, 8-20 karakter)
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;"'<>,.?\/\\|`~\-]{8,20}$/


// 9. Hex color Code (# starts 3 or 6 character)
const HEX_COLOR_PATTERN = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// 10. IP adresi (IPv4)
const IPV4_PATTERN = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// 11. IP adresi (IPv6)
const IPV6_PATTERN = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)$/;

// 12. Tarih (YYYY-MM-DD)
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// 13. Saat (HH:MM formatında)
const TIME_PATTERN = /^([01]\d|2[0-3]):?([0-5]\d)$/;

// 14. MAC adresi
const MAC_ADDRESS_PATTERN = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

// 15. Kullanıcı adı (harf ve sayılardan oluşur, 3-16 karakter uzunlukta)
const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,16}$/;

// 16. Kredi kartı numarası (Visa, MasterCard, American Express)
const CREDIT_CARD_PATTERN = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/;

// 17. Boşluk (sadece boşlukları içerir)
const WHITESPACE_PATTERN = /^\s*$/;

// 18. Pozitif tam sayı
const POSITIVE_INTEGER_PATTERN = /^[1-9]\d*$/;

// 19. Negatif tam sayı
const NEGATIVE_INTEGER_PATTERN = /^-[1-9]\d*$/;

// 20. Başında ve sonunda boşluk olmayan metin
const TRIMMED_PATTERN = /^\S(.*\S)?$/;

const PRICE_PATTERN = /^\d+([.,]\d+)?$/;

const APP_VALIDATION_PATTERNS = {
  EMAIL_PATTERN,
  URL_PATTERN,
  PHONE_PATTERN,
  TR_PHONE_PATTERN,
  POSTAL_CODE_PATTERN,
  NUMERIC_PATTERN,
  ALPHA_PATTERN,
  ALPHANUMERIC_PATTERN,
  PASSWORD_PATTERN,
  HEX_COLOR_PATTERN,
  IPV4_PATTERN,
  IPV6_PATTERN,
  DATE_PATTERN,
  TIME_PATTERN,
  MAC_ADDRESS_PATTERN,
  USERNAME_PATTERN,
  CREDIT_CARD_PATTERN,
  WHITESPACE_PATTERN,
  POSITIVE_INTEGER_PATTERN,
  NEGATIVE_INTEGER_PATTERN,
  TRIMMED_PATTERN,
  PRICE_PATTERN
};

export default APP_VALIDATION_PATTERNS;
