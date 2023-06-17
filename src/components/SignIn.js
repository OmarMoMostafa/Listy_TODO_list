import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setNotification } from "../appState/notificationSlice";
import { setProfile } from "../appState/profileSlice";
import { getProfile, signIn } from "../utilities/userHelpers";
// import { fetchProfile, signInReq } from "../appState/profileSlice";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userProfile = useSelector((state) => state.profile);
  const token = localStorage.getItem("user-token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProfile = async (token) => {
    try {
      // get profile data
      const res = await getProfile(token);
      if (res.error) return;
      dispatch(setProfile(res.user));
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (Object.keys(userProfile).length !== 0) {
      navigate("/", { replace: true });
    } else {
      if (token) {
        fetchProfile();
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      dispatch(
        setNotification({
          type: "error",
          txt: "Please fill all required fields",
          show: true,
        })
      );
      return;
    }
    const res = await signIn(email, password);
    if (res.error) {
      dispatch(
        setNotification({
          type: "error",
          txt: res.error,
          show: true,
        })
      );
      return;
    }
    dispatch(
      setNotification({
        type: "success",
        txt: "welcome back " + res.user.name,
        show: true,
      })
    );
    dispatch(setProfile(res.user));
    localStorage.setItem("user-token", res.token);
    navigate("/", { replace: true });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold italic text-gray-600">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary bg-primary-light hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Sign In
              </button>
            </div>
            <div>
              <p className="text-center">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
