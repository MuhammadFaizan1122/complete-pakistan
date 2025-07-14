import * as yup from "yup";

// Validation Schema
export const validationSchema = yup.object({
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
  // livingcity: yup.string().required("Living city is required"),
  livingcity: yup.string().required("Living city is required"),

  otherCity: yup.string().when("livingcity", (livingcity, schema) => {
    return livingcity === "Other (Specify)"
      ? schema.required("Please specify your city")
      : schema.notRequired();
  }),


  village: yup.string().required("Village/town is required"),
  gender: yup.string().required("Gender is required"),
  passportIssue: yup.string().required("Passport issue date is required"),
  passportExpiry: yup.string().required("Passport expiry date is required"),
  languages: yup.array().of(yup.string()).min(1, "At least one language is required"),
  countriesVisited: yup.array().of(yup.string()).notRequired(),
  yearsOfExperience: yup.string().notRequired(),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required"),
  whatsapp: yup
    .string()
    .notRequired(),
  otherNumber: yup
    .string()
    .notRequired(),
  backupNumber: yup
    .string()
    .notRequired(),
  backupEmail: yup.string().email("Invalid backup email").notRequired(),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  // localAddress: yup.string().required("Local address is required"),
  education: yup
    .array()
    .of(
      yup.object()
    )
    .min(1, "At least one education entry is required"),
  experience: yup
    .array()
    .of(
      yup.object()
    )
    .min(1, "At least one experience entry is required"),
  skills: yup.array().of(yup.string()).min(1, "At least one skill is required"),
  jobTitle: yup.string().required("Job title is required"),
  industry: yup.string().required("Industry is required"),
  category: yup.string().required("Category is required"),
  subcategory: yup.string().required("Subcategory is required"),
  jobDetails: yup.string().required("Job details are required"),
  attachments: yup.array().of(yup.mixed().nullable()),
});