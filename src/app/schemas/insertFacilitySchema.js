import * as Yup from "yup";

export const insertFacilitySchema = Yup.object({
    facilityName: Yup.string()
        .required("Facility Name is required"),
    facilityImg: Yup.mixed()
        .required("Facility Image is required"),
});