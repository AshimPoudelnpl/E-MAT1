import React, { useEffect } from "react";
import Image from "../assets/404.gif";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  //redirect user to previous page after 6 seconds
  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 6000);
  });

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <img src={Image} alt="404" className="w-64 h-64 mb-6" />
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-lg text-gray-700 text-center">
          This page does not exist. You will be redirected to the previous page shortly.
        </p>
      </div>
    </section>
  );
}

export default ErrorPage