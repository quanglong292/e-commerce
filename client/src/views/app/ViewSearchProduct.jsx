import React from "react";
import { useNavigate } from "react-router-dom";

const ViewSearchProduct = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <div className="flex justify-end">
        <div
          onClick={() => navigate(-1)}
          className="border-gray-400 border-2 py-1 px-2 font-semibold cursor-pointer"
        >
          X
        </div>
      </div>
      <div className="mb-4">ENTER YOUR SEARCH</div>
      <div>
        <input
          placeholder="Search"
          className="w-full border-gray-400 border-b-2 py-1 px-2 focus:outline-none"
        />
      </div>

      {/* RESULT */}
      <div>
        <h1 className="text-gray-400 text-2xl my-4 mb-8">RESULTS</h1>
      </div>
    </div>
  );
};

export default ViewSearchProduct;
