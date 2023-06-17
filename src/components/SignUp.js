import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { setNotification } from "../appState/notificationSlice";
import { setProfile } from "../appState/profileSlice";
import { getProfile, signUp } from "../utilities/userHelpers";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [pending, setPending] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.profile);
  const token = localStorage.getItem("user-token");

  const fetchProfile = async (token) => {
    try {
      // get profile data
      const res = await getProfile(token);
      dispatch(setProfile(res.user));
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
        navigate("/", { replace: true });
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      dispatch(
        setNotification({
          type: "error",
          txt: "Please fill all required fields",
          show: true,
        })
      );
      return;
    }
    const res = await signUp(name, email, password);
    // setPending(true);
    if (res.error) {
      // setPending(false);
      dispatch(
        setNotification({
          type: "error",
          txt: res.error,
          show: true,
        })
      );
      return;
    }
    // setPending(false);
    dispatch(
      setNotification({
        type: "success",
        txt: "welcome " + name,
        show: true,
      })
    );
    dispatch(setProfile(res.user));
    localStorage.setItem("user-token", res.token);
    navigate("/", { replace: true });
  };

  const Icon = FaSpinner;
  // console.log(pending);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold italic text-gray-600">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

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
                {/* {pending ? <Icon /> : "Sign up"} */}Sign Up
              </button>
            </div>
            <div>
              <p className="text-center">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
