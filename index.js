const express = require("express");
const app = express();
const db = require("./data/db-config");
const globalErrorHandler = require("./utils/globalErrorHandler");
const faker = require("faker");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const authRouter = require("./auth/auth-routes");
const { v4 } = require("uuid");


app.use(compression());
app.use(helmet());
app.use(cors());

app.use(express.json());

// const limiter = rateLimit({
//     max: 100,
//     windowMs: 60 * 60 * 1000,
//     message: "Too many requests from this IP, please try again later"
// })

// app.use('/api', limiter)

// Login limiter
// const loginLimiter = rateLimit({
//     max: 10,
//     windowMs: 60 * 60 * 1000,
//     message: "Too many login attempts, please try again later"
// })
// app.use('/api/auth/login', loginLimiter)

// XSS Attacks
app.use(xss());

// Parameter Pollution
app.use(hpp());

//ROUTES

app.get("/", (req, res) => {
  res.status(200).json({
    api: "up",
  });
});


// Global Error Handling
// app.use(globalErrorHandler);

module.exports = app;