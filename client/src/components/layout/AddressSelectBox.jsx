import React from "react";
import AddressCard from "../core/AddressCard";

const AddressSelectBox = ({ items = [], onSelect, onEdit }) => {
  return (
    <div className="my-4">
      <form
        onChange={(e) => onSelect && onSelect(items.find((i) => i.id === e.target.value))}
        className="flex flex-col gap-4"
      >
        {items.map((i, idx) => {
          const id = i.id;
          return (
            <AddressCard onEdit={() => onEdit(i)} key={idx} id={id} name="AddressSelectBox">
              <p className="font-semibold">{i.street}</p>
              <p className="text-sm">
                {i.ward} - {i.district} - {i.city}
              </p>
            </AddressCard>
          );
        })}
      </form>
      {/* <AddressCard id="qwesad1">Address1</AddressCard>
        <AddressCard id="qwesad123">Address2</AddressCard> */}
      {/* <ul class="grid w-full gap-6 md:grid-cols-2">
          <li>
            <input
              type="radio"
              id="hosting-small"
              name="hosting"
              value="hosting-small"
              class="hidden peer"
              required
            />
            <label
              for="hosting-small"
              class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div class="block">
                <div class="w-full text-lg font-semibold">0-50 MB</div>
                <div class="w-full">Good for small websites</div>
              </div>
              <svg
                aria-hidden="true"
                class="w-6 h-6 ml-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="hosting-big"
              name="hosting"
              value="hosting-big"
              class="hidden peer"
            />
            <label
              for="hosting-big"
              class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div class="block">
                <div class="w-full text-lg font-semibold">500-1000 MB</div>
                <div class="w-full">Good for large websites</div>
              </div>
              <svg
                aria-hidden="true"
                class="w-6 h-6 ml-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </label>
          </li>
        </ul> */}
    </div>
  );
};

export default AddressSelectBox;
