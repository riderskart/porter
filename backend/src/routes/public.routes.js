import { Router } from "express";
import {
  GetUserAllOrders,
  CreateOrder,
  CancelOrder,
  GetOrderDetails,
} from "../controllers/Order.controller.js";

import apiKeyAuth from "../middlewares/apiKeyAuth.js";
import apiLimiter from "../middlewares/apiRateLimiter.js";

const router = Router();

router.use(apiLimiter); // Apply rate limiting middleware to all routes
router.use(apiKeyAuth); // Apply API key authentication middleware to all routes

router.route("/order").get(GetUserAllOrders).post(CreateOrder);
router.route("/order/:id").get(GetOrderDetails).delete(CancelOrder);

export default router;
