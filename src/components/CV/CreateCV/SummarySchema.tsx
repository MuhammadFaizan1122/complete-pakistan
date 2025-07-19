import * as yup from "yup";

export const SummarySchema = yup.object({
  name: yup.string().required("Full name is required"),
  fatherName: yup.string().required("Father's name is required"),
  passport: yup
    .string()
    .matches(/^[A-Za-z]{2}\d{7}$/, "Passport must be 2 letters followed by 7 digits")
    .required("Passport number is required"),
  cnic: yup
    .string()
    .matches(/^\d{5}-\d{7}-\d{1}$/, "CNIC must be in format 12345-1234567-1")
    .required("CNIC is required"),
  dob: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), "You must be at least 18 years old"),
  passportExpiry: yup.string().required("Passport expiry date is required"),
  city: yup.string().required("City is required"),
  whatsapp: yup.string().required("WhatsApp number is required"),
  phone: yup.string().required("Phone number is required"),
  backupNumber: yup.string().notRequired(),
  industry: yup.string().required("Industry is required"),
  jobTitle: yup.string().required("Job title is required"),
  education: yup
    .array()
    .of(yup.object())
    .min(1, "At least one education entry is required"),
  technicalEducation: yup.string().notRequired(),
  pakistaniDrivingLicense: yup.string().notRequired(),
  gulfDrivingLicense: yup.string().notRequired(),
  licenseType: yup.string().notRequired(),
  languages: yup.array().of(yup.string()).min(1, "At least one language is required"),
  // File inputs
  cvImage: yup.mixed().nullable(),
  passportCopy: yup.mixed().nullable(),
  // Fields not present in the form, made optional
  drivingLicence: yup.string().notRequired(),
  madicalDate: yup.date().notRequired(),
  livingcity: yup.string().notRequired(),
  otherCity: yup.string().notRequired(),
  objective: yup.string().notRequired(),
  village: yup.string().notRequired(),
  gender: yup.string().notRequired(),
  passportIssue: yup.string().notRequired(),
  email: yup.string().email("Invalid email").notRequired(),
  otherNumber: yup.string().notRequired(),
  backupEmail: yup.string().email("Invalid backup email").notRequired(),
  country: yup.string().notRequired(),
  state: yup.string().notRequired(),
  localAddress: yup.string().notRequired(),
  category: yup.string().notRequired(),
  subcategory: yup.string().notRequired(),
  jobDetails: yup.string().notRequired(),
  experience: yup.array().of(yup.object()).notRequired(),
  skills: yup.array().of(yup.string()).notRequired(),
  countriesVisited: yup.array().of(yup.string()).notRequired(),
  yearsOfExperience: yup.string().notRequired(),
  attachments: yup.array().of(yup.mixed().nullable()).notRequired(),
});