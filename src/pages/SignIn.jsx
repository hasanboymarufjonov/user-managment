import { loginApi } from "../api/usersApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignIn = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    loginApi(email, password)
      .then((res) => {
        navigate("/users");
      })
      .catch((e) => {
        if (e === 401) {
          setMessage("Invalid credentials");
          return;
        }
        setMessage("User is blocked");
      });
  };

  return (
    <div className="flex justify-center items-center text-center">
      <div className="flex flex-col p-20">
        <h2 className="font-bold text-4xl">Sign In</h2>
        <form className="flex flex-col text-left mt-6" onSubmit={handleSubmit}>
          <input
            className="h-10 p-2 rounded-t-md bg-white w-96"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            id="email"
            name="email"
          />

          <input
            className="h-10 p-2 rounded-b-md bg-white mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />
          <button
            type="submit"
            className="bg-yellow-800 text-white mt-4 p-2 hover:bg-yellow-700 rounded"
          >
            Sign In
          </button>
        </form>
        <br />
        <hr />
        <button
          className="bg-gray-800 text-white mt-4 p-2 hover:bg-gray-700 rounded"
          onClick={() => navigate("/signup")}
        >
          Create account
        </button>
        <div className="text-red-600">{message}</div>
      </div>
    </div>
  );
};
