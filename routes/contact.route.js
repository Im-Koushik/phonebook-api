import express from "express";
import {
  createContact,
  getCommonUsers,
  getContacts,
  getContactsByUserId,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/create", createContact);
router.get("/", getContacts);
router.get("/common-users", getCommonUsers);
router.get("/contacts", getContactsByUserId);

export default router;
