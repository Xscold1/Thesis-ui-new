import * as Yup from "yup";

export const registerSchema = Yup.object({
    firstName: Yup.string()
        .max(15, "First Name must be 15 characters or less.")
        .required("First Name is required"),
    lastName: Yup.string()
        .max(15, "Last Name must be 15 characters or less.")
        .required("Last Name is required"),
    age: Yup.number().required("Age is required"),
    sex: Yup.string().required("Sex is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string()
        .min(4, "Must at least be 4 characters long")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});