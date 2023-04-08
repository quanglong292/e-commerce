import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormBuilder from "../../../../components/core/FormBuilder";
import { Collapse } from "antd";

const { Panel } = Collapse;

const FILTER_INPUT_SCHEMA = [
  {
    key: "3",
    panelContent: "Fit Types",
    formSchema: [
      "flex flex-col p-4 filterForm",
      {
        label: "Lifestyle",
        type: "CheckBox",
        field: "lifestyle",
        rules: {},
        wrapClassName: "h-auto",
        className: "flex-row-reverse justify-end gap-2",
      },
      {
        label: "Football",
        type: "CheckBox",
        field: "football",
        rules: {},
        wrapClassName: "h-auto",
        className: "flex-row-reverse justify-end gap-2",
      },
      {
        label: "Basketball",
        type: "CheckBox",
        field: "basketball",
        rules: {},
        wrapClassName: "h-auto",
        className: "flex-row-reverse justify-end gap-2",
      },
    ],
  },
  {
    key: "1",
    panelContent: "Sex",
    formSchema: [
      "flex flex-col p-4 filterForm",
      {
        label: "Men",
        type: "CheckBox",
        field: "men",
        wrapClassName: "h-auto",
        className: "flex-row-reverse justify-end gap-2",
      },
      {
        label: "women",
        type: "CheckBox",
        field: "women",
        wrapClassName: "h-auto",
        className: "flex-row-reverse justify-end gap-2",
      },
      {
        label: "kids",
        type: "CheckBox",
        field: "kids",
        wrapClassName: "h-auto",
        className: "flex-row-reverse justify-end gap-2",
      },
    ],
  },
  {
    key: "2",
    panelContent: "Brand",
    formSchema: [
      "flex flex-col p-4 filterForm",
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

const FilterBar = () => {
  const navigate = useNavigate();

  // State
  const [filter, setFilter] = useState({});

  // Functions

  return (
    <div className="w-[30%] mr-4">
      <Collapse defaultActiveKey={["1", "2", "3"]} ghost>
        {FILTER_INPUT_SCHEMA.map((i) => {
          return (
            <Panel header={i.panelContent} key={i.key}>
              <FormBuilder key={i.key} schema={i.formSchema} />
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default FilterBar;
