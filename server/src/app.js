import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import xss from "xss";
import rateLimit from 'express-rate-limit';
import authRoutes from './api/v1/auth.routes.js'
// import mongoSanitize from 'express-mongo-sanitize';


const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(
//   mongoSanitize({
//     replaceWith: '_', 
//   })
// );
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


// global rate limit
app.use(rateLimit({ windowMs: 60*1000, max: 300 }));


// mount API
app.use('/api/v1/auth', authRoutes);


export default app;