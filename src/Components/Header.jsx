import { TriangleDownIcon } from "@radix-ui/react-icons";
import logo from "../assets/Netflix_Logo_PMS.png";
import userIcon from "../assets/user-icon.svg";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    setIsOpen(false);

    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="gg flex justify-between mx-20">
      <div className="w-44">
        <img src={logo} alt="logo" />
      </div>
      {user && (
        <div className=" w-14  flex gap-2">
          <img src={userIcon} alt="user" />
          <button
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded="true"
          >
            <TriangleDownIcon />
          </button>
          {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-20 mr-16 min-w-40 rounded-md shadow-md  ring-1 ring-black ring-opacity-5 focus:outline-none border border-[rgba(255,255,255,0.5)]"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1 " role="none">
                <h1 className="block px-4 py-2 text-sm text-gray-200 hover:bg-[rgb(172,77,57)] cursor-pointer">
                  {user?.displayName}
                </h1>
                <h1
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-[rgb(172,77,57)] cursor-pointer"
                  onClick={handleSignOut}
                >
                  Sign out
                </h1>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

//  border-b border-[rgba(255,255,255,0.2)]

export default Header;
