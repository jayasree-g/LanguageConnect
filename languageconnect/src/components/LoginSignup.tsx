import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import logo from "../images/logo.png";
import Google from "../images/google";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleModeToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:8000/auth");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const responseGoogle = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={logo} alt="logo" />
      <p className="text-lg mb-4 text-gray-700 italic">
        Discover the world of languages, and converse effortlessly in any
        language!
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            className="border rounded-lg px-3 py-2 w-60"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            className="border rounded-lg px-3 py-2 w-60"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="mt-4 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition duration-300 flex gap-3 items-center"
      >
        <Google /> Continue with Google
      </button>

      <p className="mt-6">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={handleModeToggle}
          className="text-blue-500 hover:underline"
        >
          {isLogin ? "Sign up" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default LoginSignup;
