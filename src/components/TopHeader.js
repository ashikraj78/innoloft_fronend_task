import React, { useEffect, useState } from "react";
import innoloft_logo from "../innoloft_logi.svg";
import { useNavigate } from "react-router-dom";
import { counterStates, setConfigurationData } from "../redux/counterReducer";
import { useDispatch, useSelector } from "react-redux";

function TopHeader() {
  const navigate = useNavigate();
  const { productData } = useSelector(counterStates);
  const app_id = process.env.REACT_APP_ID || 1;
  const dispatch = useDispatch();
  const [configData, setConfigData] = useState(null);
  useEffect(() => {
    fetch(`https://api-test.innoloft.com/configuration/${app_id}/`)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json(); // returns a promise
      })
      .then((data) => {
        setConfigData(data);
        dispatch(setConfigurationData(data));
      })
      .catch((err) => {
        console.warn("Something went wrong.", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="topheader">
      <div className="bodyMargin flex justify-between">
        <div className="flex">
          <img
            src={innoloft_logo}
            alt="innoloft_logo"
            className="pr-20"
            onClick={() => navigate("/")}
          />
          <p
            className=" text-white pr-4 cursor-pointer text-gray-400 text-xl w-full hover:text-white hidden sm:block  "
            onClick={() => navigate("/")}
          >
            Main Page
          </p>
          <p
            className="text-white pr-4 cursor-pointer text-gray-400 text-xl hover:text-white hidden sm:block"
            onClick={() => navigate("/product")}
          >
            Product
          </p>
        </div>
        {configData?.hasUserSection && productData && (
          <section className="mt-auto mb-auto hidden sm:flex">
            <img
              src={productData?.user?.profilePicture || "/innoloft_profile.png"}
              className="rounded-full w-6 h-6 mr-2"
              alt="profile_picture"
            />
          </section>
        )}
      </div>
    </div>
  );
}
export default TopHeader;
