import React, { useEffect, useRef, useState } from "react";
import ButtonWrapper from "../../Components/Buttons";
import Card from "../../Components/Card";
import { User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import Loading from "../../assets/Loading/Loading.json";
import { FetchData } from "../../utility/fetchFromAPI";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector((store) => store.UserInfo.user);
  const Dispatch = useDispatch();
  console.log(user);

  const { userId } = useParams();
  console.log(userId);
  const [CurrentUser, setCurrentUser] = useState(null);
  const [offerFilter, setOfferFilter] = useState("");

  useEffect(() => {
    async function fetchUserData(userId) {
      const User = await FetchData(
        `user/get-user-details/${userId}`,
        // `user/get-user-details/${user?.[0]?._id}`,
        "get"
      );
      console.log(User);
      setCurrentUser(User?.data?.data);
      return User;
    }
    fetchUserData(userId);
  }, [userId]);

  const filteredOrders =
    offerFilter === "offer"
      ? CurrentUser?.allOrders?.filter(
          (order) =>
            new Date() - new Date(order.createdAt) <= 10 * 24 * 60 * 60 * 1000
        )
      : CurrentUser?.allOrders;

  const Navigate = useNavigate();
  const NavigateWallet = () => {
    Navigate("/wallet-page", { replace: true });
  };

  return (
    <div className="flex w-full justify-center items-center h-screen">
      <section className="userDetails flex flex-col justify-between h-[80%] p-10">
        <h1 className="flex items-center text-blue-600 font-bold text-xl mb-5 ">
          <User className="mr-2" />
          User Details
        </h1>
        <ButtonWrapper onClick={NavigateWallet}>Wallet</ButtonWrapper>
        <Card>
          <div>
            <h1>User ID: {CurrentUser?._id}</h1>
            <h2>Account Created At : {CurrentUser?.createdAt}</h2>
          </div>
        </Card>
        <Card>
          <div className="p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-lg">
              <h2 className="font-medium">Name:</h2>
              <span className="col-span-2 text-2xl font-semibold uppercase">
                {CurrentUser?.name}
              </span>

              <h2 className="font-medium">Email:</h2>
              <span className="col-span-2 text-2xl font-semibold">
                {CurrentUser?.email}
              </span>

              <h2 className="font-medium">Phone:</h2>
              <span className="col-span-2 text-2xl font-semibold">
                {CurrentUser?.number}
              </span>
            </div>
          </div>
        </Card>
        <Card>
          <h2>Total Orders: {filteredOrders?.length || 0}</h2>
        </Card>
      </section>
      <Card
        className={`flex flex-col justify-start items-center h-[80%] overflow-y-scroll `}
      >
        <h1 className="flex flex-col items-center text-blue-600 font-bold text-xl mb-5 ">
          List of all orders
          <span className="text-green-600">
            Total Order: {filteredOrders?.length || 0}
          </span>
          <div className="mt-4">
            <label htmlFor="offerFilter" className="mr-2">
              Filter Orders:
            </label>
            <select
              id="offerFilter"
              value={offerFilter}
              onChange={(e) => setOfferFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Orders</option>
              <option value="offer">Offers (Orders within 10 days)</option>
            </select>
          </div>
        </h1>
        {filteredOrders?.map((order, index) => (
          <div key={order._id} className="p-4 border-b border-gray-200 w-full">
            <h1 className="font-semibold">Order {index + 1}</h1>
            <h2>ID: {order._id}</h2>
          </div>
        ))}
      </Card>
    </div>

    // {!CurrentUser ? (
    //     <div className="w-screen flex justify-center items-center">
    //       <Lottie width={50} height={50} animationData={Loading} />
    //     </div>
    //   ) : }
  );
};

export default UserProfile;
