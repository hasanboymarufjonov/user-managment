import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../api/usersApi";

export const SignUp = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signUpApi(name, email, password).then((res) => {
        navigate("/signin");
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center text-center">
      <div className="flex flex-col p-20">
        <h2 className="font-bold text-4xl">Sign Up</h2>
        <form className="flex flex-col text-left mt-6" onSubmit={handleSubmit}>
          <input
            className="h-10 p-2 rounded-t-md bg-white w-96"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            id="name"
            name="name"
          />
          <input
            className="h-10 p-2 bg-white mt-1"
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
            Sign Up
          </button>
        </form>
        <button onClick={() => navigate("/signin")} className="mt-2">
          Already have an account? <span className="underline">Log in</span>
        </button>
      </div>
    </div>
  );
};
