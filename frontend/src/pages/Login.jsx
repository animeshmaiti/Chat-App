import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../components/hooks/useLogin";

export const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const { loading, login } = useLogin();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(input);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl front-semibold text-center">
          Login
          <span className="text-white"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="input input-bordered input-primary w-full max-w-xs"
              name="username"
              value={input.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered input-primary w-full max-w-xs"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 max-w-xs"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
          {"Don't have an account?"}
          <Link
            to="/signup"
            className=" text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};
