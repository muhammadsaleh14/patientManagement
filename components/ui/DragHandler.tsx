"use client";
import {
  SortableItem,
  SortableItemProps,
  SortableList,
} from "@thaddeusjiang/react-sortable-list";
import { useState } from "react";

const DragHandlerExample = (props: object) => (
  <div
    {...props}
    className=" flex justify-center items-center h-8 w-8 rounded border m-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 hover:text-white duration-300"
  >
    <div className="" title="drag handler">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
        />
      </svg>
    </div>
  </div>
);

export const DragHandler: React.FC = () => {
  const [items, setItems] = useState<SortableItemProps[]>([
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 3" },
    { id: "3", name: "Item 3" },
  ]);

  return (
    <SortableList items={items} setItems={setItems}>
      {({ items }: { items: SortableItemProps[] }) => (
        <div className="space-y-4">
          {items.map((item: SortableItemProps) => (
            <SortableItem
              key={item.id}
              id={item.id}
              DragHandler={DragHandlerExample}
              className="flex border items-center w-40"
            >
              <div>{item.name}</div>
            </SortableItem>
          ))}
        </div>
      )}
    </SortableList>
  );
};
