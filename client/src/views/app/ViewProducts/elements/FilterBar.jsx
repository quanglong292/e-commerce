import React, { useEffect, useState } from "react";
import { useResolvedPath, useSearchParams } from "react-router-dom";
import FormBuilder from "../../../../components/core/FormBuilder";
import { Collapse } from "antd";
import { FILTER_INPUT_SCHEMA } from "./constants";
import CButton from "../../../../components/core/CButton";
import useProductStore from "../../../../store/product.zustand";
import uniqBy from "lodash/uniqBy";
import ComponentLoading from "../../../../components/layout/ComponentLoading";
import { cloneDeep } from "lodash";

const { Panel } = Collapse;

const FilterBar = () => {
  const { pathname } = useResolvedPath();

  // Store
  const { allProducts, categoryGroups, categories, mutateList } =
    useProductStore((state) => state);

  // Route State
  let [searchParams, setSearchParams] = useSearchParams();

  // State
  const [_, setFilter] = useState({});
  const [filterSchema, setFilterSchema] = useState([]);

  // Functions
  const onFilterChange = (field, e, formValue) => {
    const values = cloneDeep(formValue);
    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === "undefined") delete values[key];
      if (!value && key === "sale") delete values[key];
    });
    setFilter(values);
    setSearchParams(values);
  };

  const handleSearch = async (type) => {
    if (type === "clear") {
      setFilter({});
      setSearchParams({});
      const category =
        categoryGroups.find(
          (i) => i.name.toLowerCase() === pathname.split("/")[2]
        ) ?? {};
      mutateList("products", {
        payload: allProducts.filter((i) =>
          Boolean(i.group.find((j) => j === category.id))
        ),
      });
    }
  };

  const handleInitOptions = (products, categories, categoryGroups) => {
    if (!products.length || !categories.length || !categoryGroups.length)
      return;

    const currentGroup = categoryGroups.find(
      (i) => i.name.toLowerCase() === pathname.split("/")[2]
    )?.id;
    const categoriesOptions = categories
      .filter((i) => {
        return i.groups.includes(currentGroup);
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
    handleInitOptions(allProducts, categories, categoryGroups);
  }, [allProducts, categories, categoryGroups, pathname]);

  useEffect(() => {
    const size = searchParams.get("size");
    const category = searchParams.get("category");
    const sale = searchParams.get("sale");

    if (size)
      mutateList("products", {
        payload: allProducts.filter((i) =>
          Boolean(i.stocks.find((j) => j.name == size))
        ),
      });
    else if (category)
      mutateList("products", {
        payload: allProducts.filter((i) =>
          Boolean(i.category.find((j) => j == category))
        ),
      });
    else if (sale) {
      mutateList("products", {
        payload: allProducts.filter((i) => i.price !== i.finalPrice),
      });
    } else
      mutateList("products", {
        payload: allProducts,
      });
  }, [searchParams]);

  return (
    <div className="min-w-fit w-[20%] mr-4">
      <div className="w-full h-auto max-h-[80vh] overflow-auto">
        <Collapse defaultActiveKey={["3"]} ghost>
          {!filterSchema.length ? (
            <ComponentLoading />
          ) : (
            filterSchema?.map((i) => {
              return (
                <Panel header={i.panelContent} key={i.key}>
                  <FormBuilder
                    key={i.key}
                    schema={i.formSchema}
                    onChange={onFilterChange}
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
        <CButton
          type="default"
          className="w-1/2"
          onClick={() => handleSearch("clear")}
        >
          Clear
        </CButton>
      </div>
    </div>
  );
};

export default FilterBar;
