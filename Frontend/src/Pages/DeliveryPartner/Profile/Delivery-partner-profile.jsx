import React, { useState } from "react";
import { User, Truck, Star } from "lucide-react";
import ButtonWrapper from "../../../Components/Buttons";
import Card from "../../../Components/Card";
import Badge from "../../../Components/Badge";
import ProgressBar from "../../../Components/progressBar";
import Table from "../../../Components/Table";

export default function DeliveryPartnerProfile() {
  const [activeTab, setActiveTab] = useState("orders");

  const partnerData = {
    name: "John Doe",
    address: "123 Main St, Anytown, AN 12345",
    license: "DL1234567890",
    vehicle: {
      type: "Car",
      model: "Toyota Corolla",
      year: "2019",
      plateNumber: "ABC 123",
    },
    rating: 4.8,
    verificationStatus: "Verified",
    totalDeliveries: 500,
    totalEarnings: 5000,
  };

  const orders = [
    { id: "ORD001", date: "2023-05-01", status: "Delivered", amount: 25.5 },
    { id: "ORD002", date: "2023-05-03", status: "Delivered", amount: 30.0 },
    { id: "ORD003", date: "2023-05-05", status: "Delivered", amount: 15.75 },
  ];

  const payments = [
    { id: "PAY001", date: "2023-05-02", amount: 71.25 },
    { id: "PAY002", date: "2023-05-04", amount: 30.0 },
    { id: "PAY003", date: "2023-05-06", amount: 15.75 },
  ];

  const newRequests = [
    {
      id: "REQ001",
      pickup: "456 Elm St",
      dropoff: "789 Oak St",
      distance: "3.2 miles",
      estimatedEarning: 12.5,
    },
    {
      id: "REQ002",
      pickup: "101 Pine St",
      dropoff: "202 Maple Ave",
      distance: "2.8 miles",
      estimatedEarning: 10.75,
    },
  ];

  return (
    <div className="min-h-screen bg-secondry py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold heading-text-gray mb-8 font-serif">
          Delivery Partner Profile
        </h1>

        <div className="grid grid-cols-2  sm:grid-cols-1 gap-8 mb">
          <Card title="Personal Information" className="h-full ">
            <div className="flex items-center mb-4">
              <User className="w-12 h-12 mr-4"  />
              <div>
                <div className="mt-4 flex gap-2 items-center">
                  <p className="text-lg font-semibold heading-text-gray">
                    {partnerData.name}
                  </p>
                  <Badge>{partnerData.verificationStatus}</Badge>
                </div>
                <p className="text-sm subtitle-text-gray">{partnerData.license}</p>
              </div>
            </div>
            <p className="para-text-gray">
              <span className="font-semibold heading-text-gray">Address:</span>{" "}
              {partnerData.address}
            </p>
          </Card>

          <Card title="Vehicle Details" className="h-full  ">
            <div className="flex items-center mb-4">
              <Truck className="w-12 h-12  mr-4" />
              <div>
                <p className="text-lg font-semibold heading-text-gray">
                  {partnerData.vehicle.type} - {partnerData.vehicle.model} -{" "}
                  <Badge>{partnerData.verificationStatus}</Badge>
                </p>
                <p className="text-sm subtitle-text-gray">
                  {partnerData.vehicle.year}
                </p>
              </div>
            </div>
            <p className="para-text-gray">
              <span className="font-semibold heading-text-gray">Plate Number:</span>{" "}
              {partnerData.vehicle.plateNumber}
            </p>
          </Card>
        </div>

        <Card title="Performance Metrics" className="mb-8 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6  p-4 rounded-md shadow-lg">
            <div>
              <div className="flex items-center mb-2">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-lg font-semibold ">
                  {partnerData.rating}/5
                </span>
              </div>
              <ProgressBar progress={partnerData.rating * 20} />
            </div>

            <div className="flex gap-20">
              <div>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {partnerData.totalDeliveries}
                </p>
                <p className="text-sm text-gray-600">Total Deliveries</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  ${partnerData.totalEarnings.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Total Earnings</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {["orders", "payments", "requests"].map((tab) => (
                <button
                  key={tab}
                  className={`${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === "orders" && (
          <Card title="Order History " className="">
            <Table headers={["Order ID", "Date", "Status", "Amount"]} >
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </Table>
          </Card>
        )}

        {activeTab === "payments" && (
          <Card title="Payment History" className="">
            <Table headers={["Payment ID", "Date", "Amount"]}>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </Table>
          </Card>
        )}

        {activeTab === "requests" && (
          <Card title="New Order Requests" className="">
            <Table
              headers={[
                "Request ID",
                "Pickup",
                "Dropoff",
                "Distance",
                "Est. Earning",
                "Action",
              ]}
            >
              {newRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.pickup}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.dropoff}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.distance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${request.estimatedEarning.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <ButtonWrapper
                      onClick={() => alert(`Accepted order ${request.id}`)}
                    >
                      Accept
                    </ButtonWrapper>
                  </td>
                </tr>
              ))}
            </Table>
          </Card>
        )}
      </div>
    </div>
  );
}
