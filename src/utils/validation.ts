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
        .required()
});