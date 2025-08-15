import * as yup from 'yup';

export const companySignupSchema = yup.object().shape({
    agencyName: yup.string().required("Agency name is required"),
    agencyEmail: yup.string().email().required("Agency email is required"),
    agencyLogo: yup
        .mixed()
        .required("Agency logo is required")
        .test("fileSize", "File size too large (max 5MB)", value =>
            value && value[0] && value[0].size <= 5 * 1024 * 1024
        ),
    supportingDocument: yup
        .mixed()
        .required("Supporting document is required")
        .test("fileSize", "File size too large (max 10MB)", value =>
            value && value[0] && value[0].size <= 10 * 1024 * 1024
        ),
    contactPersonIdFront: yup.mixed().required("ID front picture is required"),
    contactPersonIdBack: yup.mixed().required("ID back picture is required"),
    agencyCoverPhoto: yup.mixed().required("Cover photo is required"),
    type: yup.string().required("Type is required"),
    ntn: yup
        .string()
        .matches(/^\d{7}-\d$/, "NTN must be in format 1234567-8")
        .required("NTN is required"),
    contactPersonName: yup.string().required("Contact person name is required"),
    contactPersonPhone: yup
        .string()
        .matches(/^\+?\d{10,12}$/, "Invalid phone number")
        .required("Phone is required"),
    password: yup
        .string()
        .min(8)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must have uppercase, lowercase, and number")
        .required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required(),
    licenceNo: yup.string().required("Licence number is required"),
    proprietorName: yup.string().required("Proprietor name is required"),
    licenceTitle: yup.string().required("Licence title is required"),
    licenceStatus: yup.string().required("Licence status is required"),
    licenceExpiry: yup.date().required("Licence expiry is required"),
    country: yup.string().required("Country is required"),
    state: yup.string().nullable(),
    city: yup.string().required("City is required"),
    headOffice: yup.string().required("Head office address is required"),
    branchOffice: yup.string().nullable(),
    mapLink: yup.string().nullable(),
    ptcl: yup
        .string()
        .matches(/^\+?\d{10,12}$/, "Invalid PTCL number")
        .nullable(),
    whatsappNo: yup
        .string()
        .matches(/^\+?\d{10,12}$/, "Invalid WhatsApp number")
        .required("WhatsApp number is required"),
    websiteUrl: yup
        .string()
        .matches(/^https?:\/\/.+/, "Invalid URL")
        .nullable(),
    services: yup
        .array()
        .of(yup.string().min(2, "Service must be at least 2 characters").max(100, "Service must be at most 100 characters"))
        .max(5, "Maximum 5 services allowed")
        .nullable(),
    socialMedia: yup.object().shape({
        facebook: yup
            .string()
            .matches(/^https?:\/\/(www\.)?facebook\.com\/.+/, "Invalid Facebook URL")
            .nullable(),
        twitter: yup
            .string()
            .matches(/^https?:\/\/(www\.)?x\.com\/.+/, "Invalid Twitter URL")
            .nullable(),
        linkedin: yup
            .string()
            .matches(/^https?:\/\/(www\.)?linkedin\.com\/.+/, "Invalid LinkedIn URL")
            .nullable(),
        instagram: yup
            .string()
            .matches(/^https?:\/\/(www\.)?instagram\.com\/.+/, "Invalid Instagram URL")
            .nullable(),
    })
});