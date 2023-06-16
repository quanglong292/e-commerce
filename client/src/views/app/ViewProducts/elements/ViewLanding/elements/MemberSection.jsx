import React from "react";
import SectionHeader from "./SectionHeader";
import CButton from "../../../../../../components/core/CButton";
import { useNavigate } from "react-router-dom";

const MemberSection = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-24">
      <SectionHeader>Mike! Membership</SectionHeader>
      <div className="w-full relative">
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/5e4a0ef7-a2c9-483a-8e5b-45d8277db19d/nike-just-do-it.jpg"
          className="max-w-full"
        />

        <div className="absolute h-full w-1/2 top-0 left-12 py-4 text-white flex flex-col justify-center">
          <SectionHeader className="font-extrabold text-7xl m-0">
            Become a member
          </SectionHeader>
          <p className="my-2">Sign up for free. Join the community.</p>
          <div className="flex items-center gap-4">
            <CButton
              onClick={() => navigate("/auth/app")}
              type="default rounded-2xl font-semibold bg-white"
            >
              Join us
            </CButton>
            <CButton
              onClick={() => navigate("/auth/app")}
              type="default rounded-2xl font-semibold bg-white"
            >
              Sign in
            </CButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberSection;
