import React from "react";
import { MdVerified } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const ViewProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-14 lg:p-24 gap-20 lg:gap-28">
      <div className="md:p-8">
        <img
          src={user?.picture}
          alt="Profile"
          className="w-32 h-32 md:w-40 md:h-40 lg:w-72 lg:h-72 rounded-full cursor-pointer object-cover"
          referrerPolicy="no-referrer"
          title={user?.given_name}
        />
      </div>
      <div className="flex flex-col justify-center gap-3 md:p-8">
        <h1 className="flex items-center gap-2 text-xl md:text-3xl font-bold">
          {user?.name}
          {user?.verified_email ? <MdVerified /> : <RxCross2 />}
        </h1>
        <p className="text-[0.9rem] sm:text-lg">
          <span className="font-semibold">Email:</span> {user?.email}
        </p>
        <p className="text-[0.9rem] sm:text-lg">
          <span className="font-semibold">User ID:</span>
          {user?.id}
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default ViewProfile;
