import React from "react";
import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home/Home.index";
import Login from "./pages/Autenthication/Login";
import Home2 from "./pages/Home/Home.second";
import CurrentOrder from "./pages/Current-Order/CurrentOrder";
import CurrentUser from "./pages/User/CurrentUser";
import PartnerVerification from "./pages/PendingVerification/PartnerVerification";
import VerifiedPartner from "./pages/VerifiedPartner/VerifiedPartner";
const App = () => (
  <div className="bg-primary">
    <Routes>
      <Route path="/" element={<Login />} />

      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/home" element={<Home2 />} />
      <Route path="/current-order/:orderId" element={<CurrentOrder />} />
      <Route path="/current-user/:userId" element={<CurrentUser />} />
      <Route
        path="/current-pending-request/:verificationId"
        element={<PartnerVerification />}
      />
      <Route
        path="/current-verified-partner/:partnerId"
        element={<VerifiedPartner />}
      />
    </Routes>
  </div>
);

export default App;
