import { REQUIRED_MESSAGE } from "../../views/ViewAuthenticate/elements/SignupForm";

export const USER_DETAIL_SHCEMA = [
  "w-full",
  {
    label: "Full Name",
    type: "Text",
    field: "name",
    rules: { required: REQUIRED_MESSAGE },
    wrapClassName: "",
    className: "flex-col w-full",
  },
  {
    label: "Phone",
    type: "Text",
    field: "phone",
    rules: { required: REQUIRED_MESSAGE },
    wrapClassName: "",
    className: "flex-col w-full",
  },
  {
    label: "Birth Date",
    type: "date",
    field: "birthDate",
    rules: { required: REQUIRED_MESSAGE },
    wrapClassName: "",
    className: "flex-col w-full",
    inputClassName: "px-2 py-1 rounded-md"
  },
  {
    label: "E-Mail",
    type: "Text",
    field: "mail",
    rules: { required: REQUIRED_MESSAGE },
    wrapClassName: "",
    className: "flex-col w-full",
  },
];
