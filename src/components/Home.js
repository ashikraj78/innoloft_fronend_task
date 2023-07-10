import React from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-blue-500 flex-col mainPageBackground text-white">
      <h1 className="text-6xl text-center font-bold mx-auto mx-4 ">
        We make coding as easy as PowerPoint
      </h1>
      <p className="mt-20 mx-4 text-center text-4xl text-slate-300">
        In everything we do, we challenge the status quo of IT development.{" "}
        <br></br> We strive to make digitalization faster, cheaper and more
        user-friendly.
      </p>
      <button
        className="rounded-lg border px-8 py-4 mt-12 cursor-pointer text-lg"
        onClick={() => navigate("/product")}
      >
        Explore the Product
      </button>
    </div>
  );
}
export default Home;
