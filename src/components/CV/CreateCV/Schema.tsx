import * as yup from "yup";

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
  dob: yup.string().required("Date of birth is required"),
  city: yup.string().required("City is required"),
  otherCity: yup.string().when("city", {
            // @ts-ignore
    is: "other",
    then: yup.string().required("Other city is required"),
    otherwise: yup.string().notRequired(),
  }),
  village: yup.string().required("Village/town is required"),
  gender: yup.string().required("Gender is required"),
  passportIssue: yup.string().required("Passport issue date is required"),
  passportExpiry: yup.string().required("Passport expiry date is required"),
  languages: yup.array().min(1, "At least one language is required"),
  otherLanguages: yup.string(),
  countriesVisited: yup.array(),
  otherCountries: yup.string(),
  experienceYears: yup.string().required("Years of experience is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  pakNumber: yup
    .string()
    .matches(/^\d{3}-\d{7}$/, "Phone number must be in format 300-1234567")
    .required("Pakistan number is required"),
  whatsapp: yup.string(),
  otherNumber: yup.string(),
  backupNumber: yup.string(),
  backupEmail: yup.string().email("Invalid backup email"),
  cnicAddress: yup.string().required("Address is required"),
  facebook: yup.string().url("Invalid URL"),
  otherSocial: yup.string(),
  education: yup
    .array()
    .of(
      yup.object({
        level: yup.string().required("Education level is required"),
        additional: yup.string().when("level", {
            // @ts-ignore
          is: "Other",
          then: yup.string().required("Additional education is required"),
          otherwise: yup.string().notRequired(),
        }),
        passingYear: yup
          .string()
          .matches(/^\d{4}$/, "Invalid year")
          .required("Passing year is required"),
      })
    )
    .min(1, "At least one education entry is required"),
  experience: yup
    .array()
    .of(
      yup.object({
        industry: yup.string().required("Industry is required"),
        profession: yup.string().required("Profession is required"),
        jobTitle: yup.string().required("Job title is required"),
        companyName: yup.string().required("Company name is required"),
        companyCountry: yup.string().required("Country is required"),
        companyCity: yup.string().required("City is required"),
        duration: yup.string().required("Duration is required"),
        description: yup.string().required("Description is required"),
      })
    )
    .min(1, "At least one experience entry is required"),
  skills: yup.array().of(yup.array().min(1, "At least one skill is required")).min(1, "At least one skill set is required"),
  projects: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Project name is required"),
        country: yup.string().required("Country is required"),
        city: yup.string().required("City is required"),
        duration: yup.string().required("Duration is required"),
        designation: yup.string().required("Designation is required"),
        year: yup.string().required("Year is required"),
        teamMembers: yup.string().required("Team members are required"),
      })
    )
    .min(1, "At least one project is required"),
  attachments: yup.array(),
});
