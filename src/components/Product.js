/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  counterStates,
  setProductData,
  setTrlData,
} from "../redux/counterReducer";

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { configurationData } = useSelector(counterStates);

  const [data, setData] = useState(null);
  const googleKey = process.env.REACT_APP_GOOGLE_KEY;

  useEffect(() => {
    fetch("https://api-test.innoloft.com/product/6781/")
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json(); // returns a promise
      })
      .then((data) => {
        setData(data);
        dispatch(setProductData(data));
      })
      .catch((err) => {
        console.warn("Something went wrong.", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // the empty array makes this run only on mount

  useEffect(() => {
    fetch("https://api-test.innoloft.com/trl/")
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json(); // returns a promise
      })
      .then((data) => {
        dispatch(setTrlData(data));
      })
      .catch((err) => {
        console.warn("Something went wrong.", err);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const convertToEmbedUrl = (url) => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="mt-4 sm:w-3/4">
      <div className="mb-4 flex  justify-between ">
        <div className="flex ">
          <img src="/inno_home.svg" alt="home" className="w-6 h-6" />
          <p className="mx-2">{">"}</p>
          <p className="mx-2">Offers</p>
          <p className="mx-2">{">"}</p>
          <p>{data?.type?.name}</p>
        </div>
        <button
          className="border px-2 rounded bg-indigo-950 text-white"
          onClick={() => navigate("/product/edit")}
        >
          Edit
        </button>
      </div>
      <div className="sm:flex bg-white">
        <div
          className={
            configurationData.hasUserSection
              ? "sm:w-2/3 border rounded-l-lg"
              : "border rounded-l-lg"
          }
        >
          <img
            src={data?.picture}
            alt="arrow-down"
            className="rounded-tl-lg "
          />
          <p className="text-base font-semibold pt-2 pb-2 pl-2">{data?.name}</p>
          <div
            className="text-sm font-normal pb-2 pl-2 pr-2"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
        </div>
        {configurationData.hasUserSection && (
          <div className="sm:w-1/3 border mt-4 sm:mt-0  sm:rounded-r-lg rounded-lg">
            <p className="pt-2 pl-2">Offered By</p>
            <img
              src={data?.company?.logo || "/Logogroup.svg"}
              alt="logoGroup"
              className="pt-2 pl-2 w-3/4 sm:w-1/2"
            />
            <div className="mt-4 flex pt-2 pl-2">
              <img
                src={data?.user?.profilePicture || "/innoloft_profile.png"}
                className="rounded-full w-12 h-12 mr-4 "
                alt="profile_picture"
              />
              <div className="mt-auto mb-auto">
                <h3 className="text-base font-normal">
                  {data?.user?.firstName} {data?.user?.lastName}
                </h3>
                <p className="text-sm ">
                  {data?.company?.name || "Innoloft GmbH"}
                </p>
              </div>
            </div>
            <div className="flex pt-2 pl-2">
              <img src="/inno_location.svg" alt="location" />
              <p>
                {data?.company?.address?.street}
                {data?.company?.address?.house}, <br></br>{" "}
                {data?.company?.address?.zipCode}{" "}
                {data?.company?.address?.city?.name}{" "}
                {data?.company?.address?.country?.name}
              </p>
            </div>
            <div className="responsive-iframe-container">
              <iframe
                title="map"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/view?key=${googleKey}&center=${data?.company?.address?.latitude},${data?.company?.address?.longitude}&zoom=14`}
              ></iframe>
            </div>
          </div>
        )}
      </div>
      <div className="border rounded-lg mt-4 bg-white">
        <p className="pl-3 pt-3 pb-3">Video</p>
        <div className="responsive-iframe-container">
          <iframe
            title="video"
            src={convertToEmbedUrl(data?.video)}
            frameborder="0"
            allowfullscreen
            className="ml-auto mr-auto mb-2"
          ></iframe>
        </div>
      </div>
      <div className="border rounded-lg mt-4 bg-white mb-4">
        <p className="pl-3 pt-3 pb-3">Offer Details</p>
        <div className="flex flex-wrap ">
          <div className="flex ml-3 items-start mr-12 mb-8 ">
            <img src="/inno_tech.svg" alt="technology" />
            <div className="ml-3">
              <p>Technology</p>
              <div className="flex mt-2">
                {data?.categories?.map((x) => (
                  <p
                    key={x?.id}
                    className="rounded-lg bg-gray-300  px-3 sm:px-4 mr-1 text-sm sm:text-base"
                  >
                    {x?.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex ml-3 items-start  mr-12 mb-8 ">
            <img src="/inno_strategy.svg" alt="businessModal" />
            <div className="ml-3">
              <p>Business Model</p>
              <div className="flex mt-2 flex-wrap ">
                {data?.businessModels?.map((x) => (
                  <p
                    key={x?.id}
                    className="rounded-lg bg-gray-300 px-3 sm:px-4 mr-1 mt-2  text-sm sm:text-base"
                  >
                    {x?.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex ml-3 items-start  mr-12 mb-8 ">
            <img src="/inno_clock.svg" alt="trls" />
            <div className="ml-3">
              <p>TRL</p>

              <p className="rounded-lg bg-gray-300 px-3 sm:px-4 py-1 mt-2 text-sm sm:text-base">
                {data?.trl?.name}
              </p>
            </div>
          </div>
          <div className="flex ml-3 items-start  mr-12 mb-8 ">
            <img src="/inno_investor.svg" alt="investor" />
            <div className="ml-3">
              <p>Costs</p>
              <div className="flex mt-2">
                <p className="rounded-lg bg-gray-300 pl-4 pr-4 mr-1">
                  {data?.investmentEffort}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
