import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../components/hooks/useSignup";

export const SignUp = () => {
  const{loading,signup}=useSignup();
  
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    password: "",
    cPassword: "",
    gender: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (e) => {
    setInput({ ...input, gender: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await signup(input);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl front-semibold text-center">
          Sign Up
          <span className="text-white"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              name="fullName"
              value={input.fullName}
              type="text"
              placeholder="Enter Your Name"
              className="input input-bordered input-primary w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={input.username}
              placeholder="Enter Username"
              className="input input-bordered input-primary w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={input.password}
              placeholder="Enter Password"
              className="input input-bordered input-primary w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="cPassword"
              value={input.cPassword}
              placeholder="Enter Password"
              className="input input-bordered input-primary w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <div className="form-control">
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Male</span>
                <input
                  type="checkbox"
                  className="checkbox border-slate-900"
                  onChange={handleCheckbox}
                  checked={input.gender === "male"}
                  value="male"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Female</span>
                <input
                  type="checkbox"
                  className="checkbox border-slate-900"
                  onChange={handleCheckbox}
                  checked={input.gender === "female"}
                  value="female"
                />
              </label>
            </div>
          </div>
          <div>
            <button className="btn btn-block btn-sm mt-2 max-w-xs"
              disabled={loading}
            >
              {loading ? (<span className="loading loading-spinner"></span>) : "Create Account"}
            </button>
          </div>
          {"Already have an account? "}
          <Link
            to="/login"
            className=" text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            LogIn
          </Link>
        </form>
      </div>
    </div>
  );
};
