import * as Yup from "yup";

export const insertHospitalSchema = Yup.object({
    hospitalName: Yup.string()
        .required("Hospital Name is required"),
        barangay: Yup.string()
        .required("Barangay is required"),
        province: Yup.string()
        .required("Province is required"),
        municipality: Yup.string()
        .required("Municipality is required"),
        street: Yup.string(),
        zip: Yup.string(),
        image: Yup.mixed()
        .required("Image is required"),
        longitude: Yup.string()
        .required("Longitude is required"),
        latitude: Yup.string()
        .required("Latitude is required"),
        overview: Yup.string()
        .required("Overview is required"),
        contactInfo: Yup.string()
        .required("Contact Info is required"),
});