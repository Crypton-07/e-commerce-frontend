import React from "react";
import { UserProfile } from "../features/users/components/UserProfile";
import Navbar from "../features/navbar/Navbar";

const UserProfilePage = () => {
  return (
    <>
      <Navbar>
        <h1 className="text-center text-2xl font-bold text-white py-2 flex items-center justify-center capitalize mb-2 w-full bg-[#6366f1] rounded-sm shadow-sm">
          My Profile
        </h1>
        <UserProfile />
      </Navbar>
    </>
  );
};

export default UserProfilePage;
