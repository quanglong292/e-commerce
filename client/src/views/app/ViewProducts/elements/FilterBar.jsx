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
import useProductStore from "../../../../store/product.zustand";
import uniqBy from "lodash/uniqBy";
import ComponentLoading from "../../../../components/layout/ComponentLoading";

const { Panel } = Collapse;

const FilterBar = () => {
  const path = useResolvedPath();
  const navigate = useNavigate();

  // Store
  const { products, categories, filterOptions } = useProductStore(
    (state) => state
  );

  // Route State
  let [searchParams, setSearchParams] = useSearchParams();

  // State
  const [filter, setFilter] = useState({});
  const [filterSchema, setFilterSchema] = useState([]);

  // Functions
  const onFilterChange = (e, field) => {
    let value = ["number", "string"].includes(typeof e) ? e : e.target.name;
    const obj = { ...filter, [field]: value };

    setFilter(obj);
    setSearchParams(obj);
  };

  const handleSearch = () => {};

  const handleInitOptions = (products, categories) => {
    // console.log("handleInitOptions", { products, categories });
    if (!products.length || !categories.length) return;

    const categoriesOptions = categories
      .filter((i) => {
        const isExistGroup = i.groups.find((j) => j === filterOptions.group);
        return isExistGroup;
      })
      .map((i) => ({ ...i, label: i.name, value: i.id }));
    const productSizes = uniqBy(
      products
        .map((i) => i.stocks)
        .flat()
        .map((i) => ({ ...i, label: i.name, value: i.name })),
      "name"
    );

    const filterSchema = FILTER_INPUT_SCHEMA.map((i) => {
      let newFormSchema = i.formSchema;

      if (i.optionField === "category") {
        // i.formSchema = i.formSchema
        newFormSchema[1] = { ...newFormSchema[1], options: categoriesOptions };
      }

      if (i.optionField === "size") {
        newFormSchema[1] = { ...newFormSchema[1], options: productSizes };
      }

      return {
        ...i,
        formSchema: newFormSchema,
      };
    });

    setFilterSchema(filterSchema);
  };

  // Effects
  useEffect(() => {
    handleInitOptions(products, categories);
  }, [products, categories]);

  return (
    <div className="min-w-fit w-[20%] mr-4">
      <div className="w-full h-auto max-h-[80vh] overflow-auto">
        <Collapse defaultActiveKey={["1", "2", "3"]} ghost>
          {!filterSchema.length ? (
            <ComponentLoading />
          ) : (
            filterSchema?.map((i) => {
              return (
                <Panel header={i.panelContent} key={i.key}>
                  <FormBuilder
                    key={i.key}
                    schema={i.formSchema}
                    onChange={(value) => onFilterChange(value, i.optionField)}
                  />
                </Panel>
              );
            })
          )}
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
