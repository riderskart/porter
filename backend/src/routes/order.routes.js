import { Router } from "express";
import {
  CreateOrder,
  CancelOrder,
  GetUserAllOrders,
  // UpdateOrder,
  UpdateOrderStatus,
  GetOrderDetails,
} from "../controllers/Order.controller.js";
import { VerifyUser } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(VerifyUser);

router.route("/create-new-order").post(CreateOrder);
router.route("/get-all-order").get(GetUserAllOrders);
router.route("/get-order-details/:orderId").get(GetOrderDetails);

// Additional routes for updating order status and details
// router.route("/update-order/:orderId").patch(UpdateOrder);
router.route("/update-order-status/:orderId").patch(UpdateOrderStatus);

router.route("/cancel-order/:orderId").delete(CancelOrder);

export default router;
