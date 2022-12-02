import * as Yup from "yup";

export const updateAffiliateSchema = Yup.object({
    contact: Yup.string()
        .required("Contact is required"),
    schedules: Yup.string()
        .required("Schedule is required"),
});