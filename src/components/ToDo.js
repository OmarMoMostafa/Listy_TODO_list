import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "./ProfilePage";
import TaskList from "./TaskList";
import { getProfile } from "../utilities/userHelpers";
import { setProfile } from "../appState/profileSlice";

const ToDo = () => {
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.profile);
  const token = localStorage.getItem("user-token");

  useEffect(() => {
    const profileReq = async () => {
      if (Object.keys(userProfile).length === 0) {
        if (!token) {
          navigate("/sign-in", { replace: true });
        } else {
          try {
            // get profile data
            const res = await getProfile(token);
            if (res.error) {
              navigate("/sign-in", { replace: true });
            }
            dispatch(setProfile(res.user));
          } catch (e) {
            navigate("/sign-in", { replace: true });
          }
        }
      }
    };
    profileReq();
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsHidden(true);
    }
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
