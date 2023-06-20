import { FILTER_OPTIONS } from "../../../../utils/constants/navigation.constant";

export const FILTER_INPUT_SCHEMA = [
  {
    key: "3",
    panelContent: "Category",
    optionField: FILTER_OPTIONS.category,
    formSchema: [
      "grid grid-cols-1 py-2 pl-4 filterForm",
      {
        label: "",
        type: "Select",
        field: "category",
        wrapClassName: "h-auto",
        className: "w-full",
        placeholder: "Select style",
        allowClear: true,
        options: [
          {
            label: "Lifestyle",
            value: "lifeStyle",
          },
        ],
      },
    ],
  },
  {
    key: "1",
    panelContent: "Size",
    optionField: "size",
    formSchema: [
      "grid grid-cols-1 py-2 pl-4 filterForm size",
      {
        label: "",
        type: "Select",
        field: "size",
        wrapClassName: "h-auto",
        className: "w-full",
        placeholder: "Select size",
        allowClear: true,
        options: [
          {
            label: "8 US",
            value: 8,
          },
        ],
      },
    ],
  },
  {
    key: "2",
    panelContent: "Sale & Offers",
    optionField: "sale",
    formSchema: [
      "flex flex-col py-2 pl-4 filterForm",
      {
        label: "Sale",
        type: "CheckBox",
        field: "sale",
        rules: {},
        wrapClassName: "h-auto",
        className: "flex-row-reverse justify-end gap-2",
      },
    ],
  },
];
