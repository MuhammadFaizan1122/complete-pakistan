import * as yup from "yup";

export const SummarySchema = yup.object({
  name: yup.string().required("Full name is required"),
  fatherName: yup.string().required("Father's name is required"),
  birthYear: yup
    .number()
    .typeError("Birth year must be a number")
    .required("Birth year is required"),
  birthMonth: yup.string().required("Birth month is required"),
  passport: yup
    .string()
    .matches(/^[A-Za-z]{2}\d{7}$/, "Passport must be 2 letters followed by 7 digits")
    .required("Passport number is required"),
  cnic: yup
    .string()
    .matches(/^\d{5}-\d{7}-\d{1}$/, "CNIC must be in format 12345-1234567-1")
    .required("CNIC is required"),
  city: yup.string().required("City is required"),
  whatsapp: yup.string().required("WhatsApp number is required"),
  phone: yup.string().required("Call number is required"),
  backupNumber: yup.string().notRequired(),
  bestCallbackTime: yup.string().notRequired(),
  industry: yup.string().required("Industry is required"),
  appliedPosition: yup.string().required("Applied position is required"),
  education: yup.string().required("Education is required"),
  technicalEducation: yup.string().notRequired(),
  localLicense: yup.string().oneOf(["LTV", "HTV", ""], "Invalid Pakistani license").notRequired(),
  licenseCountry: yup
    .string()
    .oneOf([
      "Saudi",
      "UAE",
      "Bahrain",
      "Kuwait",
      "Iraq",
      "Iran",
      "Qatar",
      "Oman",
      "Others",
      ""
    ], "Invalid license country")
    .notRequired(),
  licenseType: yup
    .string()
    .oneOf([
      "SAIQ KHAS",
      "NAQAL KHAFEEF",
      "NAQAL SAQEEL",
      "HTV",
      "LTV",
      "HEAVY MACHINERY LICENSE",
      "TOWER CRANE OPERATOR",
      "OTHERS",
      ""
    ], "Invalid license type")
    .notRequired(),
  languages: yup.array().of(yup.string()).min(1, "At least one language is required"),
  saudiExp: yup.string().notRequired(),
  uaeExp: yup.string().notRequired(),
  gulfExp: yup.string().notRequired(),
  passportExpiryMonth: yup.string().notRequired(),
  passportExpiryYear: yup
    .number()
    .typeError("Year must be a number")
    .notRequired(),
});
