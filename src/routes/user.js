import express from "express";
import {
    signin, signup, getAll, remove, update, get
} from "../controllers/user";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();
router.get("/user", getAll);
router.get("/user/:id", checkPermission, get);
router.delete("/user/:id",checkPermission, remove);
router.put("/user/:id", update);
router.post("/signup", signup);
router.post("/signin", signin);

export default router;