import * as yup from "yup";
export const UPDATE_SCHEMA = yup.object().shape({
  username: yup.string().required("Username is required"),
  department: yup.string().required("Department is required"),
  roll_no: yup.string().required("Roll No is required"),
  gender: yup.string().required("Gender is required"),
  phone: yup
    .string()
    .matches(/^\d{10,15}$/, "Invalid phone number")
    .required("Phone is required"),
  academic_year: yup.string().required("Academic Year is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  address: yup.string().required("Address is required"),
});
