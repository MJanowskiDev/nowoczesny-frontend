import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      yup_required: "field is required!",
      yup_email: "Wrong email",
      yup_card_year_month: "Wrong data format, enter MM/YY",
      yup_wrong_month: "Wrong month",
    },
  },
  pl: {
    translation: {
      yup_required: "Pole wymagane",
      yup_email: "Niepoprawny adres E-mail",
      yup_card_year_month: "Niepoprawne dane, wprowadź MM/RR",
      yup_wrong_month: "Niepoprawny miesiąc",
      "First name": "Imię",
      "Last name": "Nazwisko",
      "E-mail": "E-mail",
      Phone: "Telefon",
      "Card details": "Szczegóły karty",
      "Card number": "Numer karty",
      "Billing Address": "Adres do rozliczeń",
      "ZIP/Post Code": "Kod pocztowy",
      "Form language:": "Język formularza:",
      Proceed: "Kontynuuj",
      England: "Anglia",
      Scotland: "Szkocja",
      France: "Francja",
      Belgium: "Belgia",
      Japan: "Japonia",
      "Form submission succeeded!": "Przesłanie formularza powiodło się!",
      Success: "Sukces",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
