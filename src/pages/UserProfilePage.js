import React from "react";
import { UserProfile } from "../features/users/components/UserProfile";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

const UserProfilePage = () => {
  return (
    <>
      <Navbar>
        <h1 className="text-center text-2xl font-bold text-white py-2 flex items-center justify-center capitalize mb-2 w-full bg-[#6366f1] rounded-sm shadow-sm">
          My Profile
        </h1>
        <UserProfile />
      </Navbar>
      {/* <Footer /> */}
    </>
  );
};

export default UserProfilePage;
