import * as Yup from "yup";

export const insertAffiliateSchema = Yup.object({
    hospitalName: Yup.string()
        .required("Hospital Name is required"),
    contact: Yup.string()
        .required("Contact is required"),
    schedules: Yup.string()
        .required("Schedule is required"),
});