import logo from "../assets/Netflix_Logo_PMS.png";
const Header = () => {
  return (
    <div className="mx-20">
      <img className="absolute z-10 w-40" src={logo} alt="logo" />
    </div>
  );
};

export default Header;
