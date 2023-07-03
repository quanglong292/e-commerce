import React from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Table } from "antd";
import { useState } from "react";
import CButton from "./CButton";

const Row = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      }
    ),
    transition,
    cursor: "move",
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
        }
      : {}),
  };
  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};
const CSortTable2 = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text) => {
        return (
          <button
            onClick={(e) => {
              e.stopPropagation()
              console.log({ text });
            }}
            className="z-[9999999]"
          >
            click
          </button>
        );
      },
    },
  ];
  const [dataSource, setDataSource] = useState([
    {
      _id: "643b7388b752d53251d73bc9",
      id: "fb4e1888-071e-429f-ae47-9fd148a935e7",
      name: "Women",
      __v: 0,
      key: "1",
    },
    {
      _id: "643b7390b752d53251d73bcc",
      id: "6229565d-d641-4976-899b-e45a2b641f10",
      name: "Kids",
      __v: 0,
      key: "2",
    },
    {
      _id: "643b739ab752d53251d73bcf",
      id: "761fcea4-58b4-4ce9-a4a5-fd5239228047",
      name: "Sale",
      __v: 0,
      key: "3",
    },
    {
      _id: "643b7526b752d53251d73bf5",
      id: "3a576665-6ee2-4592-a05d-9b5b70b47a84",
      name: "Brand",
      __v: 0,
      key: "4",
    },
    {
      _id: "6497c90af9c4b8842b35e6b5",
      id: "ed29be2f-4c37-47d1-a23b-44085cecf91e",
      name: "Men",
      __v: 0,
      key: "5",
    },
    {
      key: "6",
      name: "John Brown",
      age: 32,
      address: "click",
    },
  ]);
  const onDragEnd = ({ active, over }) => {
    console.log({ active, over });
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };
  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        // rowKey array
        items={dataSource.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          components={{
            body: {
              row: Row,
            },
          }}
          rowKey="key"
          columns={columns}
          dataSource={dataSource}
        />
      </SortableContext>
    </DndContext>
  );
};
export default CSortTable2;
