import React from "react";

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div className="flex justify-center gap-2 sm:mt-7 mt-5 mb-10">
      {gotoPrevPage && (
        <button
          onClick={gotoPrevPage}
          className="py-2 px-6 bg-gray-700 text-white rounded-md sm:text-sm text-xs"
        >
          Previous
        </button>
      )}
      {gotoNextPage && (
        <button
          onClick={gotoNextPage}
          className="py-2 px-6 bg-gray-700 text-white rounded-md sm:text-sm text-xs"
        >
          Next
        </button>
      )}
    </div>
  );
}
