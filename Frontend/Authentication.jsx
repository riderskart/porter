import LogIn from "./Login";
import Register from "./Register";

const Authentication = () => {
  return (
    <div className="bg-redBg h-screen">
      <div className=" h-fit flex justify-start">
        <div className="  w-1/2 m-10 mr-20">
          <Register />
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/dur4pixxs/image/upload/f_auto,q_auto/oqaj8wux5vgmhscdqs2h"
            alt=""
            className=" scale-150 relative top-32 "
          />
        </div>
        <div className=" m-10 ml-20">
          <LogIn />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
