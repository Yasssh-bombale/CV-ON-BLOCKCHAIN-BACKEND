import { Router } from "express";
import { createCv, getCv } from "../controllers/cv.controller";

const router = Router();

router.post("/create", createCv);
router.get("/getCv/:id", getCv);
export default router;
