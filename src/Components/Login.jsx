import Header from "./Header";
import { Button } from "@radix-ui/themes";
import BgImg from "../assets/Netflix-bg.jpg";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className=" absolute">
        <img src={BgImg} alt="bg-img" className=" opacity-40" />
      </div>
      {/* bg-[rgba(27,29,30,0.7) */}

      <form className="bg-[rgba(24,17,17,.9)]  absolute w-3/12 flex flex-col mx-auto left-0 right-0 p-10 mt-28 border border-[rgba(255,255,255,.3)] rounded-xl gap-5">
        <div className="mb-2">
          <h1 className="text-3xl">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        </div>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Name"
            className="px-3 py-2 rounded-md bg-[rgba(50,33,33,0.44)] border border-[rgba(255,255,255,0.18)] text-gray-200 focus:outline  focus:border-2 focus:border-[rgb(229,77,46)]"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="px-3 py-2 rounded-md bg-[rgba(50,33,33,0.44)] border border-[rgba(255,255,255,0.18)] text-gray-200 focus:outline  focus:border-2 focus:border-[rgb(229,77,46)]"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-3 py-2 rounded-md bg-[rgba(50,33,33,0.44)] border border-[rgba(255,255,255,0.18)] text-gray-200 focus:outline  focus:border-2 focus:border-[rgb(229,77,46)]"
        />
        <Button>{isSignInForm ? "Sign In" : "Sign Up"}</Button>
        <p className="text-gray-400">
          {isSignInForm ? "New to Netflix?" : "Already User ?"}{" "}
          <span
            className="text-white cursor-pointer font-medium hover:underline"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? " Sign up now." : "Sign In"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
