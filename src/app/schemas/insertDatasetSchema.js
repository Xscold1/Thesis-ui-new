import * as Yup from "yup";

export const insertDatasetSchema = Yup.object({
    diseaseName: Yup.string()
        .required("Disease Name is required"),
    age: Yup.string()
        .required("Age is required"),
    gender: Yup.string()
        .required("Sex is required"),
    symptoms: Yup.string()
        .required("List of Symptoms required"),
    exercise: Yup.string()
        .required("Exercise Field is required"),
    posture: Yup.string()
        .required("Posture Field is required"),
    smoker: Yup.string()
        .required("Smoker Field is required"),
    unhealthyDiet: Yup.string()
        .required("Healthy Diet Field is required"),
});