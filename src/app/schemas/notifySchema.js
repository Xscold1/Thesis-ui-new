import * as Yup from "yup";

export const notifySchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    repoUrl: Yup.string().required("repoUrl is required"),
    message: Yup.string().required("Message is required"),
});