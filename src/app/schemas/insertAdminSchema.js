import * as Yup from "yup";

export const insertAdminSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
        .min(4, "Must at least be 4 characters long")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});