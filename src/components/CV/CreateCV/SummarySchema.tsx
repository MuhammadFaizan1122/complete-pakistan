import * as yup from "yup";

const industries = ["Construction", "IT", "Healthcare", "Engineering", "Hospitality", "Logistics", "Others"];
const licenseCountries = ["Saudi", "UAE", "Bahrain", "Kuwait", "Iraq", "Iran", "Qatar", "Oman", "Others"];
const licenseTypes = [
  "SAIQ KHAS",
  "NAQAL KHAFEEF",
  "NAQAL SAQEEL",
  "HTV",
  "LTV",
  "HEAVY MACHINERY LICENSE",
  "TOWER CRANE OPERATOR",
  "OTHERS",
];
const languages = [
  "ENGLISH", "URDU", "PUNJABI", "SIRAIKI", "BALOCHI", "HINDI", "PUSHTO",
  "TURKISH", "MEMON", "KATHIAWAR", "MARWARI", "BENGALI", "OTHERS",
];

export const SummarySchema = yup.object({
  cvImage: yup.mixed().required("Profile picture is required"),
  passportCopy: yup.mixed().required("Passport copy is required"),
  name: yup.string().required("Full name is required"),
  fatherName: yup.string().required("Father's name is required"),
  birthYear: yup
    .number()
    .typeError("Birth year must be a number")
    .required("Birth year is required")
    .min(1900, "Birth year must be after 1900")
    .max(new Date().getFullYear(), "Birth year cannot be in the future"),
  birthMonth: yup
    .string()
    .required("Birth month is required")
    .matches(/^(January|February|March|April|May|June|July|August|September|October|November|December)$/i, "Invalid month"),
  passport: yup
    .string()
    .matches(/^[A-Za-z]{2}\d{7}$/, "Passport must be 2 letters followed by 7 digits")
    .required("Passport number is required"),
  passportExpiryMonth: yup
    .string()
    .required("Passport expiry month is required")
    .matches(/^(January|February|March|April|May|June|July|August|September|October|November|December)$/i, "Invalid month"),
  passportExpiryYear: yup
    .number()
    .typeError("Year must be a number")
    .required("Passport expiry year is required")
    .min(new Date().getFullYear(), "Expiry year cannot be in the past"),
  cnic: yup
    .string()
    .matches(/^\d{5}-\d{7}-\d{1}$/, "CNIC must be in format 12345-1234567-1")
    .required("CNIC is required"),
  city: yup.string().required("City is required"),
  whatsapp: yup
    .string()
    .required("WhatsApp number is required")
    .matches(/^\+\d{10,15}$/, "Enter a valid phone number (e.g., +1234567890)"),
  phone: yup
    .string()
    .required("Call number is required")
    .matches(/^\+\d{10,15}$/, "Enter a valid phone number (e.g., +1234567890)"),
  backupNumber: yup
    .string()
    .required("Backup contact number is required")
    .matches(/^\+\d{10,15}$/, "Enter a valid phone number (e.g., +1234567890)"),
  bestCallbackTime: yup
    .string()
    .required("Best callback time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Enter a valid time (e.g., 14:30)"),
  industry: yup
    .string()
    .required("Industry is required")
    .oneOf(industries, "Invalid industry"),
  appliedPosition: yup.string().required("Applied position is required"),
  education: yup.string().required("Education is required"),
  technicalEducation: yup.string().required("Technical education is required"),
  localLicense: yup
    .string()
    .required("Pakistani driving license is required")
    .oneOf(["LTV", "HTV"], "Invalid Pakistani license"),
  licenseCountry: yup
    .string()
    .required("License country is required")
    .oneOf(licenseCountries, "Invalid license country"),
  licenseType: yup
    .string()
    .required("License type is required")
    .oneOf(licenseTypes, "Invalid license type"),
  languages: yup.array().of(yup.string()).min(1, "At least one language is required"),
  saudiExp: yup.string().required("Saudi experience is required"),
  uaeExp: yup.string().required("UAE experience is required"),
  gulfExp: yup.string().required("Gulf experience is required"),
});