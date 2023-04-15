export const FILTER_INPUT_SCHEMA = [
  {
    key: "3",
    panelContent: "Fit Types",
    optionField: "useType",
    formSchema: [
        "grid grid-cols-1 py-2 pl-4 filterForm",
      {
        label: "",
        type: "Select",
        field: "",
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
      "grid grid-cols-1 py-2 pl-4 filterForm",
      {
        label: "",
        type: "Select",
        field: "",
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
    panelContent: "Brand",
    optionField: "brand",
    formSchema: [
      "flex flex-col py-2 pl-4 filterForm",
      {
        label: "Air Jordan",
        type: "CheckBox",
        field: "airJordan",
        rules: {},
        wrapClassName: "h-auto",
        className: "flex-row-reverse justify-end gap-2",
      },
      {
        label: "Air Max",
        type: "CheckBox",
        field: "airMax",
        rules: {},
        wrapClassName: "h-auto",
        className: "flex-row-reverse justify-end gap-2",
      },
      {
        label: "Stan Smith",
        type: "CheckBox",
        field: "stanSmith",
        rules: {},
        wrapClassName: "h-auto",
        className: "flex-row-reverse justify-end gap-2",
      },
    ],
  },
];
