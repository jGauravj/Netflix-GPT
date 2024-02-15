import Header from "./Header";
import { Button } from "@radix-ui/themes";
import BgImg from "../assets/Netflix-bg.jpg";
import { useRef, useState } from "react";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signErrorMessage, setSignErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handlFormSubmit = () => {
    let isValid = true;

    if (!isSignInForm) {
      const nameValue = name.current.value.trim();
      if (!nameValue) {
        setNameErrorMessage("Please enter your name.");
        isValid = false;
      } else if (!validName(nameValue)) {
        setNameErrorMessage(
          "Please enter your vaild name.(minimum 3 characters)"
        );
      } else {
        setNameErrorMessage("");
      }
    }

    const emailValue = email.current.value.trim();
    if (!emailValue) {
      setEmailErrorMessage("Please enter your email address.");
      isValid = false;
    } else if (!validEmail(emailValue)) {
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailErrorMessage("");
    }

    const passwordValue = password.current.value.trim();
    if (!passwordValue) {
      setPasswordErrorMessage("Please enter your password.");
      isValid = false;
    } else if (!validPassword(passwordValue)) {
      setPasswordErrorMessage(
        "Please enter a valid password (minimum 8 characters, at least one letter and one number)."
      );
      isValid = false;
    } else {
      setPasswordErrorMessage("");
    }

    if (isValid) {
      console.log("Form submit successfully!");
    }

    if (!isValid) return;

    // Sign in / Sign up Logic --->

    if (!isSignInForm) {
      // Sign UP logic -->

      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            // photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setSignErrorMessage(error.errorMessage);
            });

          updateProfile(auth.currentUser, {
            displayName: name.current.value,
          });
          // ...
        })
        .catch((error) => {
          let errorMessage;

          switch (error.code) {
            case "auth/email-already-in-use":
              errorMessage = "The email address is already in use.";
              break;
            case "auth/operation-not-allowed":
              errorMessage = "Signup operation is not allowed.";
              break;
            case "auth/network-request-failed":
              errorMessage =
                "Network error. Please check your internet connection.";
              break;
            default:
              errorMessage = "An error occurred. Please try again later.";
          }
          setSignErrorMessage(errorMessage);
        });
    } else {
      // Sign In logic -->
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          let errorMessage;
          switch (error.code) {
            case "auth/invalid-email":
              errorMessage = "Invalid email address.";
              break;
            case "auth/user-disabled":
              errorMessage = "Your account has been disabled.";
              break;
            case "auth/user-not-found":
              errorMessage = "User not found.";
              break;
            case "auth/wrong-password":
              errorMessage = "Invalid password.";
              break;
            case "auth/invalid-credential":
              errorMessage =
                "Invalid credentials. Please check your email and password.";
              break;
            // Add more cases for other error codes as needed
            default:
              errorMessage = "An error occurred. Please try again later.";
          }
          setSignErrorMessage(errorMessage);
        });
    }
  };

  // Name validation -->

  const validName = (name) => {
    const isValidName = /^[A-Za-z]{3,20}$/.test(name);
    return isValidName;
  };

  // Email Validation -->

  const validEmail = (email) => {
    const isValidEmail =
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    return isValidEmail;
  };

  //  Password Validation  -->

  const validPassword = (password) => {
    const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(
      password
    );
    return isValidPassword;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className=" absolute z-40 overflow-x-hidden w-full">
        <Header />
      </div>

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
            className="px-3 w-full py-2 rounded-md bg-[rgba(50,33,33,0.44)] border border-[rgba(255,255,255,0.18)] text-gray-200 focus:outline  focus:border-2 focus:border-[rgb(229,77,46)]"
          />
        </div>
        <div className="relative">
          <p className="text-xs text-red-600">{passwordErrorMessage}</p>
          <input
            type={showPassword ? "text" : "password"}
            ref={password}
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
        <p className="text-xs text-red-600 font-semibold">{signErrorMessage}</p>

        <Button onClick={handlFormSubmit}>
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
