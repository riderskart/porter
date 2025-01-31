import React, { useState, useEffect } from "react";
import ButtonWrapper from "../../Components/Buttons";
import Card from "../../Components/Card";
import { FetchData } from "../../utility/fetchFromAPI";

const PaymentPage = ({ transactionId, userId }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [amount, setAmount] = useState(0.0);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPaymentDetails = async () => {
    try {
      setLoading(true);
      const response = await FetchData(
        `paymentTransaction/${transactionId}/${userId}`,
        "get"
      );
      const payment = response.data?.data;
      setAmount(payment.amount || 0.0);
      setPaymentMethod(payment.method || "upi");
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching payment details");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transactionId && userId) {
      fetchPaymentDetails();
    } else {
      setError(
        "Transaction ID and User ID are required to fetch payment details."
      );
    }
  }, [transactionId, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePayment = () => {
    alert(`Payment of ₹${amount} via ${paymentMethod} Successful!`);
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="py-20 flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="py-20 flex items-center justify-center bg-primary">
      <Card className="w-full max-w-lg shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Payment Page
        </h2>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Select Payment Method
          </h3>
          <div className="flex space-x-4">
            {["upi", "wallet", "creditCard"].map((method) => (
              <ButtonWrapper
                key={method}
                onClick={() => handlePaymentMethodChange(method)}
                className={`py-2 px-4 border rounded-md ${
                  paymentMethod === method
                    ? "bg-button text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {method === "upi"
                  ? "UPI"
                  : method === "wallet"
                  ? "Wallet"
                  : "Card"}
              </ButtonWrapper>
            ))}
          </div>
        </div>

        {/* Payment Method Details */}
        {paymentMethod === "creditCard" && (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Card Number
              </label>
              <input
                type="number"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-600">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-600">
                  CVV
                </label>
                <input
                  type="password"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>
          </form>
        )}

        {paymentMethod === "upi" && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-600">
              UPI ID
            </label>
            <input
              type="text"
              name="upiId"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              placeholder="example@upi"
              required
            />
          </div>
        )}

        {paymentMethod === "wallet" && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-600">
              Wallet Number
            </label>
            <input
              type="text"
              name="walletNumber"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              placeholder="Enter Wallet Number"
              required
            />
          </div>
        )}

        <div className="mt-6 p-4 bg-green-400 rounded-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">
            Payment Summary
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Total Amount:{" "}
            <span className="font-bold text-gray-800">₹ {amount}</span>
          </p>
        </div>

        <ButtonWrapper className="my-5 w-full" onClick={handlePayment}>
          Pay ₹ {amount}
        </ButtonWrapper>
      </Card>
    </div>
  );
};

export default PaymentPage;
