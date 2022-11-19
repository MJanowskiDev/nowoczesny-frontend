import { useTranslation } from "react-i18next";

export const ChangeLanguage = () => {
  const { i18n, t } = useTranslation();
  return (
    <>
      {" "}
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={`p-2 m-2 border ${
          i18n.language === "en" ? "border-teal-600 bg-teal-600/30" : ""
        }`}
      >
        EN
      </button>
      <button
        onClick={() => i18n.changeLanguage("pl")}
        className={`p-2 m-2 border ${
          i18n.language === "pl" ? "border-teal-600 bg-teal-600/30" : ""
        }`}
      >
        PL
      </button>
    </>
  );
};
