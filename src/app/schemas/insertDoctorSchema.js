import * as Yup from "yup";

export const insertDoctorSchema = Yup.object({
    firstName: Yup.string()
        .required("First Name is required"),
    lastName: Yup.string()
        .required("Last Name is required"),
    specialization: Yup.string()
        .required("Specialization is required"),
    doctorImg: Yup.mixed()
        .required("Doctor Image is required"),
    // doctorImg: Yup.string()
    //     .required("Doctor Image is required"),
});