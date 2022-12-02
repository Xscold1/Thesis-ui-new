import * as Yup from "yup";

export const insertDiseaseSchema = Yup.object({
    diseaseName: Yup.string()
        .required("Disease Name is required"),
    // diseaseReference: Yup.string()
    //     .required("Disease Reference is required"),
    diseaseSymptoms: Yup.string()
    .required("Disease Symptoms is required"),
    diseaseSpecialist: Yup.string()
        .required("Disease Specialist is required"),
    diseaseOverview: Yup.string()
        .required("Disease Overview is required"),
    diseaseHistory: Yup.string()
        .required("Disease History is required"),
    diseaseTreatments: Yup.string()
        .required("Disease Treatment is required"),
});