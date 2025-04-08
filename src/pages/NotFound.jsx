import { faAngry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <p className="font-bold text-3xl">
        <FontAwesomeIcon icon={faAngry} color="yellow" />
      </p>
      <p className="font-bold text-3xl text-red-900">404 not found</p>
    </div>
  );
};

export default NotFound;
