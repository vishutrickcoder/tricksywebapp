import  express from "express";
import aboutController from "../controllers/about.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";  
const router = express.Router();
// Public
router.get("/", aboutController.getAbout);

// Admin only
router.post("/", authMiddleware, aboutController.saveAbout);
router.delete("/", authMiddleware, aboutController.deleteAbout);

export default router;
