// routes/service.routes.js
import express from "express";
import Service from "../models/service.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Admin: CRUD services
router.post("/", authMiddleware, async (req, res) => {
  console.log(req.body)
  const service = new Service(req.body);
  await service.save();
  res.json(service);
});

router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

router.put("/:id", authMiddleware, async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(service);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
