import { Router } from "express";
import {
  GetActiveOrder,
  GetDriver,
  LoginDriver,
  RegenerateRefreshToken,
  RegisterDriver,
  Subscribe,
  ToggleActiveDriver,
  ToggleSuspendPartner,
  UpdateDriverAddress,
} from "../controllers/driver.controller.js";

const router = Router();

router.route("/register").post(RegisterDriver);
router.route("/login").post(LoginDriver);
router.route("/refresh-token").post(RegenerateRefreshToken);

router.route("/get-driver-details/:driverId").get(GetDriver);

router.route("/active-order/:driverId").post(GetActiveOrder);

router.route("/subscribe").post(Subscribe);

router.route("/toggle-active-driver/:driverId").post(ToggleActiveDriver);

router.route("/toggle-suspend-partner/:partnerId").post(ToggleSuspendPartner);

router
  .route("/update-driver-address/:user?.[0]?.address")
  .post(UpdateDriverAddress);

export default router;
