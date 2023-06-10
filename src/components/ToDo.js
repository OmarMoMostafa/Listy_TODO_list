import React, { useEffect, useState } from "react";
import ProfilePage from "./ProfilePage";
import TaskList from "./TaskList";

const ToDo = () => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleProfile = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className=" flex flex-wrap min-h-screen">
      <div
        className={`z-10 md:relative fixed bg-gray-100 h-full md:h-auto md:w-1/4 w-2/3 ${
          isHidden ? "hidden" : ""
        }`}
      >
        <ProfilePage />
      </div>
      <div className="w-3/4 p-5">
        <TaskList />
      </div>
      <button
        className="fixed top-0 right-0 block md:hidden bg-blue-500 text-white font-semibold px-4 py-2 rounded"
        onClick={handleToggleProfile}
      >
        {isHidden ? "Show Profile" : "Hide Profile"}
      </button>
    </div>
  );
};

export default ToDo;
