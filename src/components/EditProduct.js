import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import DOMPurify from "dompurify";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { counterStates, setProductData } from "../redux/counterReducer";

function EditProduct() {
  const dispatch = useDispatch();
  const googleKey = process.env.REACT_APP_GOOGLE_KEY;
  const { productData, trlData, configurationData } =
    useSelector(counterStates);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [productDescription, setProductDescription] = useState(
    productData?.description
  );
  const [techInputs, setTechInputs] = useState(productData.categories);
  const [businessModelInputs, setBusinessModelInputs] = useState(
    productData?.businessModels
  );
  const [selectedOption, setSelectedOption] = useState(
    productData?.trl?.id || "9"
  );
  const [inputValue, setInputValue] = useState(
    productData?.name || "Put you title"
  );
  const [videoLink, setVideoLink] = useState(productData?.video);
  const [cost, setCost] = useState(productData?.investmentEffort);
  const [buttonColor, setButtonColor] = useState("bg-slate-500");

  useEffect(() => {
    const sanitizedHTML = DOMPurify.sanitize(productData?.description);
    const contentState = stateFromHTML(sanitizedHTML);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    // const rawContentState = convertToRaw(contentState);
    const html = stateToHTML(contentState);
    setProductDescription(html);
  };

  const handleCostChange = (event) => {
    setCost(event.target.value);
  };

  const handleTitleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleLinkChange = (event) => {
    setVideoLink(event.target.value);
  };
  const handleTechInputChange = (event, id) => {
    const newInputs = techInputs.map((input) => {
      if (input.id === id) {
        return { ...input, name: event.target.value };
      }
      return input;
    });
    setTechInputs(newInputs);
  };

  const handleBusinessModelInputChange = (event, id) => {
    const newInputs = businessModelInputs.map((input) => {
      if (input.id === id) {
        return { ...input, name: event.target.value };
      }
      return input;
    });
    setBusinessModelInputs(newInputs);
  };

  const handleSelectionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    saveContent();
  };
  const handleButtonPress = () => {
    setButtonColor("bg-blue-500");
    handleEditProduct();
  };
  const handleButtonRelease = () => {
    setButtonColor("bg-slate-500");
  };
  const handleEditProduct = () => {
    let productEditedData = {
      ...productData,
      name: inputValue,
      description: productDescription,
      video: videoLink,
      categories: techInputs,
      businessModels: businessModelInputs,
      trl: trlData[+selectedOption - 1],
      investmentEffort: cost,
    };
    dispatch(setProductData(productEditedData));
    updateEditedData(productEditedData);
  };
  async function updateEditedData(productEditedData) {
    await fetch(`https://api-test.innoloft.com/product/${productData?.id}/`, {
      method: "POST",
      body: JSON.stringify(productEditedData),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  }

  return (
    <div className="mt-4 sm:w-3/4 mb-4">
      <div className="sm:flex bg-white">
        <div
          className={
            configurationData.hasUserSection
              ? "sm:w-2/3 border rounded-l-lg"
              : "border rounded-l-lg "
          }
        >
          <div className="relative">
            <div className="flex justify-between absolute w-full ">
              <div className="flex ">
                <img src="/inno_patent.svg" alt="patent" />
                <p className="pl-3 pt-2 bg-white pr-3 rounded-br-lg">Patent</p>
              </div>
              <img
                src="/inno_delete.svg"
                alt="delete_icon"
                className="bg-white p-3 rounded-bl-lg cursor-pointer "
              />
            </div>
            <img
              src={productData?.picture || "/image 1.png"}
              alt="arrow-down"
              className="rounded-tl-lg"
            />
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={handleTitleChange}
            className="border rounded p-2 block m-4 font-bold text-lg inputTitle "
            placeholder="Add the Title"
          />

          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: ["inline", "list", "textAlign", "link", "history"], // specify which toolbar options to enable
              inline: {
                inDropdown: false, // inline options will be directly in the toolbar
                options: ["bold", "italic"], // specify which inline options to enable
              },
            }}
            placeholder="Write the description"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
          />
        </div>
        {configurationData.hasUserSection && (
          <div className="sm:w-1/3 border rounded-r-lg">
            <p className="pt-2 pl-2">Offered By</p>
            <img
              src={productData?.company?.logo || "/Logogroup.svg"}
              alt="logoGroup"
              className="pt-2 pl-2 w-3/4 sm:w-1/2"
            />
            <div className="mt-4 flex pt-2 pl-2">
              <img
                src={
                  productData?.user?.profilePicture || "/innoloft_profile.png"
                }
                className="rounded-full w-12 h-12 mr-4 "
                alt="profile_picture"
              />
              <div className="mt-auto mb-auto">
                <h3 className="text-base font-normal">
                  {productData?.user?.firstName} {productData?.user?.lastName}
                </h3>
                <p className="text-sm ">
                  {productData?.company?.name || "Innoloft GmbH"}
                </p>
              </div>
            </div>
            <div className="flex pt-2 pl-2">
              <img src="/inno_location.svg" alt="location" />
              <p>
                {productData?.company?.address?.street}
                {productData?.company?.address?.house}, <br></br>{" "}
                {productData?.company?.address?.zipCode}{" "}
                {productData?.company?.address?.city?.name}{" "}
                {productData?.company?.address?.country?.name}
              </p>
            </div>
            <div className="responsive-iframe-container">
              <iframe
                title="map"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/view?key=${googleKey}&center=${productData?.company?.address?.latitude},${productData?.company?.address?.longitude}&zoom=14`}
              ></iframe>
            </div>
          </div>
        )}
      </div>
      <div className="border rounded-lg mt-4 sm:pr-6 bg-white">
        <p className="pl-3 pt-3 pb-3">Video</p>
        <input
          type="text"
          value={videoLink}
          onChange={handleLinkChange}
          className="border rounded p-2 mx-3 mb-3 font-regular w-full text-l"
          placeholder="Add a youtube link"
        />
      </div>
      <div className="border rounded-lg mt-4 bg-white">
        <p className="pl-3 pt-3 pb-3">Offer Details</p>
        <div className="flex flex-wrap ">
          <div className="flex ml-3 items-start mr-12 mb-8 ">
            <img src="/inno_tech.svg" alt="technology" />
            <div className="ml-3">
              <p>Technology</p>
              <div className="flex mt-2">
                {techInputs.map((input) => (
                  <div key={input.id}>
                    <input
                      type="text"
                      value={input.name}
                      onChange={(event) =>
                        handleTechInputChange(event, input.id)
                      }
                      className="border mr-4 rounded px-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex ml-3 items-start  mr-12 mb-8 ">
            <img src="/inno_strategy.svg" alt="businessModal" />
            <div className="ml-3">
              <p>Business Model</p>
              <div className="flex mt-2 flex-wrap  ">
                {businessModelInputs.map((input) => (
                  <div key={input.id}>
                    <input
                      type="text"
                      value={input.name}
                      onChange={(event) =>
                        handleBusinessModelInputChange(event, input.id)
                      }
                      className="border mr-4 rounded px-2 mt-3"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex ml-3 items-start  sm:mr-12 mb-8 ">
            <img src="/inno_clock.svg" alt="trls" />
            <div className="ml-3">
              <p>TRL</p>

              <select
                value={selectedOption}
                onChange={handleSelectionChange}
                className="border rounded p-1 w-full "
              >
                {trlData?.map((item) => (
                  <option key={item.id} value={item.id} className="w-full">
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex ml-3 items-start  mr-12 mb-8 ">
            <img src="/inno_investor.svg" alt="investor" />
            <div className="ml-3">
              <p>Costs</p>
              <input
                type="text"
                value={cost}
                onChange={handleCostChange}
                className="border rounded px-2 "
                placeholder="Add investment effort cost"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          className={`${buttonColor} w-full md:w-auto my-4 md:my-2 py-2 md:py-1 px-4 rounded text-xl md:text-lg font-semibold transition-colors duration-150 ease-in-out`}
          onMouseDown={handleButtonPress}
          onMouseUp={handleButtonRelease}
          onMouseLeave={handleButtonRelease}
        >
          Update
        </button>
      </div>
    </div>
  );
}
export default EditProduct;
