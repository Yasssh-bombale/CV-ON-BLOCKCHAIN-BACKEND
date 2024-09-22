import { Router } from "express";
import { createCv } from "../controllers/cv.controller";

const router = Router();

router.post("/create", createCv);

export default router;
