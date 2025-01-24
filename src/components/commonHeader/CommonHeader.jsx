import React from "react";
// import { MdOutlineFileDownload } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";

const CommonHeader = ({ name }) => {
  return (
    <>
      <div className="border flex justify-between items-center mb-2 p-2">
        <h1 className="text-2xl font-semibold p-2">{name}</h1>
        <div className="flex items-center gap-2 text-md font-semibold px-4 py-2 rounded-lg border border-blue-100 cursor-pointer active:bg-blue-300 hover:bg-blue-100">
          Download
          <span>
            <FaCloudDownloadAlt />
          </span>
        </div>
      </div>
    </>
  );
};

export default CommonHeader;
