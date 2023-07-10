import React from "react";
import { useSelector } from "react-redux";
import { counterStates } from "../redux/counterReducer";

function MainNavigation() {
  const { productData, configurationData } = useSelector(counterStates);

  return (
    <div className=" w-1/4 hidden sm:block ">
      {configurationData.hasUserSection && (
        <div className="mt-4 flex">
          <img
            src={productData?.user?.profilePicture || "/innoloft_profile.png"}
            className="rounded-full w-20 h-20 mr-4 "
            alt="profile_picture"
          />
          <div className="mt-auto mb-auto">
            <h3 className="text-lg font-semibold">
              {productData?.user?.firstName} {productData?.user?.lastName}
            </h3>
            <p className="text-lg ">{productData?.company?.name}</p>
          </div>
        </div>
      )}

      <div>
        <div className="flex p-3 mt-2">
          <img src="/inno_home.svg" alt="home" className="w-6 h-6" />
          <p className="pl-3">Home</p>
        </div>
        <div className="flex p-3 mt-2">
          <img src="/inno_group.svg" alt="home" className="w-6 h-6" />
          <p className="pl-3">Members</p>
        </div>
        <div className="flex p-3 mt-2">
          <img src="/inno_organizations.svg" alt="home" className="w-6 h-6" />
          <div className="flex justify-between w-full">
            <p className="pl-3">Organizations</p>
            <img src="/inno_accordion-down-light.svg" alt="arrow-down" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainNavigation;
