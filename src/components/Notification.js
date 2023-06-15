import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../appState/notificationSlice";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const { type, txt, show } = notification;
  const dispatch = useDispatch();

  const closeNot = () => {
    dispatch(setNotification({ ...notification, show: false }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeNot();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [show]);

  const Icon = type === "success" ? FaCheckCircle : FaTimesCircle;

  return (
    <div
      className={`translate-x-1/2 fixed right-1/2 w-full z-50 p-4 transition-opacity duration-300 ${
        show ? "block" : "hidden"
      }`}
    >
      <div
        className={`flex items-center justify-between w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg ${
          type === "success" ? "border-green-500" : "border-red-500"
        } border-2`}
      >
        <div className="flex items-center p-2">
          <Icon
            className={`w-6 h-6 text-${
              type === "success" ? "green" : "red"
            }-500`}
          />
          <span className="ml-2 capitalize text-sm font-medium">{txt}</span>
        </div>
        <button className="p-2" onClick={closeNot}>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 8.586L6.707 5.293a1 1 0 00-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 101.414 1.414L10 11.414l3.293 3.293a1 1 0 001.414-1.414L11.414 10l3.293-3.293a1 1 0 00-1.414-1.414L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
