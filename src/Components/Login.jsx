import Header from "./Header";
import { Button } from "@radix-ui/themes";
import BgImg from "../assets/Netflix-bg.jpg";
import { useRef, useState } from "react";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {};

  // Name validation -->

  const validName = (name) => {
    const isValidName = /^[A-Za-z]{3,20}$/.test(name);
    return isValidName;
  };

  const handleNameBlur = () => {
    const nameValue = name.current.value;
    console.log(nameValue);
    const isName = validName(nameValue);
    if (!isName) {
      setNameErrorMessage("Please enter name.");
    } else {
      setNameErrorMessage("");
    }
  };

  // Email Validation -->

  const validEmail = (email) => {
    const isValidEmail =
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    return isValidEmail;
  };

  const handleEmailBlur = () => {
    const emailValue = email.current.value;
    const isValid = validEmail(emailValue);
    if (!isValid) {
      setEmailErrorMessage("Please enter a valid email address.");
    } else {
      setEmailErrorMessage("");
    }
  };

  //  Password Validation  -->

  const validPassword = (password) => {
    const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(
      password
    );
    return isValidPassword;
  };

  const handlePasswordBlur = () => {
    const passwordValue = password.current.value;
    const isValidPass = validPassword(passwordValue);
    if (!isValidPass) {
      setPasswordErrorMessage("Please enter a valid Password.");
    } else {
      setPasswordErrorMessage("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Header />
      <div className=" absolute">
        <img src={BgImg} alt="bg-img" className=" opacity-40" />
      </div>

      <form
        className="bg-[rgba(24,17,17,.9)]  absolute w-3/12 flex flex-col mx-auto left-0 right-0 p-10 mt-28 border border-[rgba(255,255,255,.3)] rounded-xl gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mb-2">
          <h1 className="text-3xl">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        </div>
        {!isSignInForm && (
          <div>
            <p className="text-xs text-red-600">{nameErrorMessage}</p>
            <input
              type="text"
              ref={name}
              onBlur={handleNameBlur}
              placeholder="Name"
              className="px-3 py-2 w-full rounded-md bg-[rgba(50,33,33,0.44)] border border-[rgba(255,255,255,0.18)] text-gray-200 focus:outline  focus:border-2 focus:border-[rgb(229,77,46)]"
            />
          </div>
        )}
        <div>
          <p className="text-xs text-red-600">{emailErrorMessage}</p>
          <input
            type="text"
            placeholder="Email Address"
            ref={email}
            onBlur={handleEmailBlur}
            className="px-3 w-full py-2 rounded-md bg-[rgba(50,33,33,0.44)] border border-[rgba(255,255,255,0.18)] text-gray-200 focus:outline  focus:border-2 focus:border-[rgb(229,77,46)]"
          />
        </div>
        <div className="relative">
          <p className="text-xs text-red-600">{passwordErrorMessage}</p>
          <input
            type={showPassword ? "text" : "password"}
            ref={password}
            onBlur={handlePasswordBlur}
            placeholder="Password"
            className="px-3 py-2 w-full rounded-md bg-[rgba(50,33,33,0.44)] border border-[rgba(255,255,255,0.18)] text-gray-200 focus:outline  focus:border-2 focus:border-[rgb(229,77,46)]"
          />
          <button
            onClick={togglePasswordVisibility}
            className="absolute mt-2  transform -translate-x-8 p-1 rounded-md text-gray-400"
          >
            {showPassword ? <EyeOpenIcon /> : <EyeNoneIcon />}
          </button>
        </div>

        <Button onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </Button>
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
