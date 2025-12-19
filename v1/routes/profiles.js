import express from "express";
import { getProfiles } from "../controller/profiles.js";

const router = express.Router();
export default router

router.get('/', getProfiles)