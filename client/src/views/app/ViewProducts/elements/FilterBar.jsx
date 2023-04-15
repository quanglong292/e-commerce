import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useResolvedPath,
  useSearchParams,
} from "react-router-dom";
import FormBuilder from "../../../../components/core/FormBuilder";
import { Collapse } from "antd";
import { FILTER_INPUT_SCHEMA } from "./constants";
import CButton from "../../../../components/core/CButton";

const { Panel } = Collapse;

const FilterBar = () => {
  const path = useResolvedPath();
  const navigate = useNavigate();

  // State
  const [filter, setFilter] = useState({});
  let [searchParams, setSearchParams] = useSearchParams();

  // Functions
  const onFilterChange = (e, field) => {
    let value = ["number", "string"].includes(typeof e) ? e : e.target.name;
    const obj = { ...filter, [field]: value };

    setFilter(obj);
    setSearchParams(obj);
  };

  const handleSearch = () => {};

  // useEffect(() => {

  //   console.log("searchParams");
  // }, [searchParams]);

  return (
    <div className="min-w-fit w-[20%] mr-4">
      <div className="w-full h-auto max-h-[80vh] overflow-auto">
        <Collapse defaultActiveKey={["1", "2", "3"]} ghost>
          {FILTER_INPUT_SCHEMA.map((i) => {
            return (
              <Panel header={i.panelContent} key={i.key}>
                <FormBuilder
                  key={i.key}
                  schema={i.formSchema}
                  onChange={(value) => onFilterChange(value, i.optionField)}
                />
              </Panel>
            );
          })}
        </Collapse>
      </div>
      <div className="flex gap-4 w-full mt-2">
        <CButton type="primary" className="w-1/2" onClick={handleSearch}>
          Search
        </CButton>
        <CButton type="default" className="w-1/2" onClick={handleSearch}>
          Clear
        </CButton>
      </div>
    </div>
  );
};

export default FilterBar;
