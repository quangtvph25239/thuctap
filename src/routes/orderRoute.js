import express from "express";
import formdata from "express-form-data";
import * as Order from "../controllers/order.js";
import * as per from "../middlewares/checkPermission.js";

const router = express.Router();

router.post("/order", Order.OrderUser);
router.get("/GetDetailOrder", Order.GetDetailOrder);
router.get("/GetAllOrder", Order.GetAllOrder);

//
router.get("/deleteOrder", Order.deleteOrder);
router.get("/updateOrder", Order.updateOrder);





export default router;
