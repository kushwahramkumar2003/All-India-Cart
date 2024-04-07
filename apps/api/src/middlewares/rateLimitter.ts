import setRateLimit from "express-rate-limit";

export const rateLimitMiddleware = setRateLimit({
    windowMs: 10 * 60 * 1000,
    max: 50,
    message: "You have exceeded your 50 request in 10 min.",
    headers: true,
  });