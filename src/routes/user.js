import express from "express";
import { addUser, deleteUser, editUser, getAllUsers, getAUser } from "../controllers/user.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(addUser)
router.route("/:id").get(getAUser).put(editUser).delete(deleteUser)

export default router