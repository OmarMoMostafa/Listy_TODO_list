import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../appState/notificationSlice";
import { setProfile } from "../appState/profileSlice";
import {
  deleteAccount,
  SignOut,
  SignOutAll,
  updateProfile,
} from "../utilities/userHelpers";

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userProfile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("user-token");

  useEffect(() => {
    setName(userProfile.name);
    setEmail(userProfile.email);
  }, [userProfile]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async () => {
    const newData = ({ name, email, password }) => {
      if (!password) {
        return { name, email };
      }
      return { name, email, password };
    };
    setPassword("");
    try {
      const res = await updateProfile(
        newData({ name, email, password }),
        token
      );
      if (res.error) {
        dispatch(
          setNotification({
            type: "error",
            txt: res.error.message,
            show: true,
          })
        );
        return;
      }
      dispatch(setProfile(res.user));
      dispatch(
        setNotification({
          type: "success",
          txt: "profile updated succefully",
          show: true,
        })
      );
      setIsEditMode(false);
    } catch (e) {}
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await deleteAccount(token);
      dispatch(setProfile({}));
      localStorage.removeItem("user-token");
      navigate("/sign-in", { replace: true });
      console.log(res);
    } catch (error) {}
  };

  const handleSignOut = async () => {
    try {
      const res = await SignOut(token);
      if (res.error) {
        return;
      }
      dispatch(setProfile({}));
      localStorage.removeItem("user-token");
      navigate("/sign-in", { replace: true });
      console.log(res);
    } catch (error) {}
  };

  const handleSignOutAll = async () => {
    try {
      const res = await SignOutAll(token);
      if (res.error) {
        return;
      }
      dispatch(setProfile({}));
      localStorage.removeItem("user-token");
      navigate("/sign-in", { replace: true });
      console.log(res);
    } catch (error) {}
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="my-6 text-3xl font-extrabold italic text-gray-600">
        Listy
      </h1>

      <div className="flex flex-col justify-center items-center mb-4">
        <img
          onError={(e) => {
            e.target.src = "https://www.w3schools.com/howto/img_avatar.png";
          }}
          src={`http://localhost:8000/users/${userProfile?._id}/avatar`}
          alt="Avatar"
          className="w-16 h-16 rounded-full mr-4 mb-3"
        />

        <div className="flex flex-col justify-center items-center">
          {isEditMode ? (
            <input
              type="text"
              className="border rounded py-2 px-3 mb-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <h2 className="text-xl font-bold">{name}</h2>
          )}

          {isEditMode ? (
            <input
              type="email"
              className="border rounded py-2 px-3 mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <p>{email}</p>
          )}

          {isEditMode && (
            <input
              type="password"
              className="border rounded py-2 px-3 mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </div>

        {isEditMode ? (
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white me-5 font-semibold px-4 my-3 py-2 rounded"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 my-3 py-2 rounded"
              onClick={() => {
                setIsEditMode(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 my-3 py-2 rounded"
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}

        {!isEditMode ? (
          <div className="flex flex-col">
            <button
              className="border-2 border-red-500  hover:bg-red-600 text-red-500 hover:text-white font-semibold px-4 my-3 py-2 rounded"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <button
              className="border-2 border-red-500  hover:bg-red-600 text-red-500 hover:text-white font-semibold px-4 my-3 py-2 rounded"
              onClick={handleSignOutAll}
            >
              Sign Out From All Devices
            </button>

            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 my-3 py-2 rounded"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePage;
