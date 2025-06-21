import * as yup from 'yup';

export const companySignupSchema = yup.object().shape({
    agencyName: yup.string().min(2, "Agency name must be at least 2 characters").required("Agency name is required"),
    agencyEmail: yup.string().email("Invalid email address").required("Agency email is required"),
    agencyLogo: yup
        .mixed()
        .required("Agency logo is required")
        .test("fileSize", "File size too large (max 5MB)", (value) => {
            return value && value[0] && value[0].size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Unsupported file type", (value) => {
            return value && value[0] && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type);
        }),
    ntn: yup.string().matches(/^\d{7}-\d$/, "Invalid NTN format (e.g., 1234567-8)").required("NTN/Tax ID is required"),
    supportingDocument: yup
        .mixed()
        .required("Supporting document is required")
        .test("fileSize", "File size too large (max 10MB)", (value) => {
            return value && value[0] && value[0].size <= 10 * 1024 * 1024;
        })
        .test("fileType", "Unsupported file type", (value) => {
            return value && value[0] && ["application/pdf", "image/jpeg", "image/png"].includes(value[0].type);
        }),
    contactPersonName: yup.string().min(2, "Contact person name must be at least 2 characters").required("Contact person name is required"),
    contactPersonPhone: yup.string().matches(/^\+?\d{10,12}$/, "Invalid phone number format").required("Contact person phone is required"),
    contactPersonIdFront: yup
        .mixed()
        .required("ID front picture is required")
        .test("fileSize", "File size too large (max 5MB)", (value) => {
            return value && value[0] && value[0].size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Unsupported file type", (value) => {
            return value && value[0] && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type);
        }),
    contactPersonIdBack: yup
        .mixed()
        .required("ID back picture is required")
        .test("fileSize", "File size too large (max 5MB)", (value) => {
            return value && value[0] && value[0].size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Unsupported file type", (value) => {
            return value && value[0] && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type);
        }),
    agencyCoverPhoto: yup
        .mixed()
        .required("Agency cover photo is required")
        .test("fileSize", "File size too large (max 5MB)", (value) => {
            return value && value[0] && value[0].size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Unsupported file type", (value) => {
            return value && value[0] && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type);
        }),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});
