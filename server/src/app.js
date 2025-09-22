import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import xss from "xss";
import rateLimit from 'express-rate-limit';

import authRoutes from './api/v1/auth.routes.js';
import aboutRoutes from "./api/v1/about.route.js";
import serviceRoutes from "./api/v1/services.routes.js";

const app = express();

// Security middlewares
app.set('trust proxy', 1);
app.use(helmet());
app.use(
  cors({ 
    origin: [process.env.FRONTEND_ORIGIN || "https://tricksywebapp.vercel.app"], 
    credentials: true 
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// XSS sanitization
app.use((req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
});

// Global rate limit
app.use(rateLimit({ windowMs: 60*1000, max: 300 }));

// Mount API routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/services", serviceRoutes);

// ✅ Test API route
app.get('/', (req, res) => {
  res.json({ success: true, message: "API is working!" });
});

export default app;
