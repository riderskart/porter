import { AlignLeft, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonWrapper from "./Buttons";
import { Logo } from "../Constants/homeConstants";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../utility/Slice/UserInfoSlice";
import { alertInfo } from "../utility/Alert";

const Header = () => {
  // constants
  const [showHamburger, setShowHamburger] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.UserInfo.user);
  const Dispatch = useDispatch();

  // console.log(user);
  const location = useLocation();

  //  UI for Hamburger
  const Hamburger = ({ onClose }) => {
    const modelRef = useRef();

    const closeModel = (e) => {
      if (modelRef.current === e.target) {
        onClose();
      }
    };

    return (
      <div
        ref={modelRef}
        onClick={closeModel}
        className="fixed inset-0 flex  w-[50vw] h-60 z-50  bg-white backdrop-blur-3xl rounded-r-xl overflow-hidden  "
      >
        <div className="flex flex-col  w-full  ">
          <div className="h-248 flex justify-between p-6 gap-2">
            <div className="">
              <h1 className="text-xl font-serif font-semibold">Menu</h1>
            </div>
            <div>
              <button className="" onClick={onClose}>
                <X size={30} />
              </button>
            </div>
          </div>

          <section className="menu-section flex flex-col">
            <Link to={"/"} onClick={onClose} className=" font-Exo my-1 mx-2  ">
              For Enterprise/ Personal
            </Link>
            <Link
              to="/delivery-partners"
              onClick={onClose}
              className=" font-Exo my-1 mx-2  "
            >
              For Delivery Partner
            </Link>
            {user ? (
              <Link
                to={"/logout"}
                onClick={onClose}
                className=" font-Exo my-1 mx-2  "
              >
                Log out
              </Link>
            ) : (
              <Link
                to={"/login"}
                onClick={onClose}
                className=" font-Exo my-1 mx-2  "
              >
                Login
              </Link>
            )}
            {user ? (
              <Link to={"/all-orders"} className=" font-Exo my-1 mx-2  ">
                all Orders
              </Link>
            ) : null}
            <Link to={"#"} onClick={onClose} className=" font-Exo my-1 mx-2  ">
              Support
            </Link>
          </section>
        </div>
      </div>
    );
  };

  return (
    <div className="Header  flex laptop:justify-around items-center sticky top-0  h-16 z-50 drop-shadow-xl">
      {/* Hamburger for phone and tab view */}
      <div className="Hamburger ml-2 laptop:hidden">
        <button
          className="laptop:hidden mobile:block"
          onClick={() => setShowHamburger(true)}
        >
          <AlignLeft
            size={25}
            className="m-1 group-hover:text-black text-black lg:hidden font-light"
          />
        </button>

        {showHamburger && (
          <Hamburger
            onClose={() => {
              setShowHamburger(false);
            }}
          />
        )}
      </div>

      <div
        onClick={() => navigate("/")}
        className="logo phone:mx-5  laptop:m-0 phone:flex justify-center items-center cursor-pointer"
      >
        <img
          src={Logo}
          alt="Logo"
          title={`Rider's Kart`}
          className="w-16 phone:hidden tablet:block"
        />
        <h1 className="phone:text-lg tablet:text-2xl font-Knewave heading-text-gray  ">
          Rider's Kart
        </h1>
      </div>

      <div className="navigation hidden laptop:flex gap-12">
        <Link
          className={`font-serif ${
            location.pathname === "/"
              ? " text-xl heading-text-gray"
              : "subtitle-text-gray "
          }`}
          to={`/`}
        >
          For Enterprise/ Personal
        </Link>
        <Link
          className={`font-serif ${
            location.pathname === "/delivery-partners"
              ? " text-xl heading-text-gray"
              : "subtitle-text-gray "
          }`}
          to={"/delivery-partners"}
        >
          For Delivery Partner
        </Link>
      </div>
      <div className="support hidden laptop:flex laptop:justify-center items-center gap-5 heading-text-gray">
        <Link className="font-sans subtitle-text-gray " to={`#`}>
          Support
        </Link>

        {user && user.length > 0 ? (
          <div>
            <ButtonWrapper
              onClick={() => {
                Dispatch(clearUser());
                navigate("/login");
                socket.leave("UsersRoom");
                alertInfo("you are logged Out! Please log in");
              }}
            >
              Log out
            </ButtonWrapper>
            <ButtonWrapper
              onClick={() => {
                navigate("/all-orders");
              }}
            >
              all Orders
            </ButtonWrapper>
            <ButtonWrapper
              onClick={() => {
                navigate("/user-profile");
              }}
            >
              Profile
            </ButtonWrapper>
          </div>
        ) : (
          <ButtonWrapper
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </ButtonWrapper>
        )}
        {/* {user && user.length > 0 ? (
          <div className="flex gap-2">
            <ButtonWrapper
              onClick={() => {
                navigate("/all-orders");
              }}
            >
              all Orders
            </ButtonWrapper>
            <ButtonWrapper
              onClick={() => {
                navigate("/user-profile");
              }}
            >
              Profile
            </ButtonWrapper>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default Header;
