// validations/consultantSchema.ts
import * as yup from "yup";

export const consultantSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  title: yup.string().required("Professional Title is required"),
  locationCity: yup.string().required("City is required"),
  locationCountry: yup.string().required("Country is required"),
  experienceYears: yup
    .number()
    .typeError("Years of Experience must be a number")
    .min(0, "Years must be positive")
    .required("Years of Experience is required"),
  successRate: yup
    .number()
    .typeError("Success Rate must be a number")
    .min(0)
    .max(100, "Success Rate must be between 0 and 100")
    .required("Success Rate is required"),
  clientsHelped: yup
    .number()
    .typeError("Clients Helped must be a number")
    .min(0)
    .required("Clients Helped is required"),
  phone: yup
    .string()
    .matches(/^\+92[0-9]{10}$/, "Phone must be in format +923001234567")
    .required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  officeAddress: yup.string().required("Office Address is required"),
  about: yup.string().min(50, "About section must be at least 50 characters").required(),
  specializations: yup.array().of(yup.string()).min(1, "At least 1 specialization is required"),
  services: yup.array().of(yup.string()).min(1, "At least 1 service is required"),
  languages: yup.array().of(yup.string()).min(1, "At least 1 language is required"),
  portfolioItems: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required("Portfolio description required"),
        successRate: yup.string().required("Portfolio success rate required"),
        year: yup.string().required("Portfolio year required"),
      })
    )
    .min(1, "At least 1 portfolio item is required"),
  videoLinks: yup.array().of(yup.string().url("Invalid video URL")),
});
