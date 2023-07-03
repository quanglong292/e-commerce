import React, { memo } from "react";
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
// import { useState } from "react";
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

const CSortTable = ({ onFinishDrag, dataSource = [], columns, ...others }) => {
  // Functions
  const onDragEnd = ({ active, over, activatorEvent }) => {
    const innerText = activatorEvent?.target?.innerText?.toLowerCase();
    const isClickAction = ["edit", "delete"].includes(innerText);

    if (isClickAction) {
      const record = dataSource?.find((i) => i.key === active.id);
      onFinishDrag(innerText, record);
    }
    if (active.id !== over?.id) {
      onFinishDrag((prev) => {
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
          {...others}
          dataSource={dataSource}
          columns={columns}
          // columns={columns}
          components={{
            body: {
              row: Row,
            },
          }}
        />
      </SortableContext>
    </DndContext>
  );
};
export default memo(CSortTable);
