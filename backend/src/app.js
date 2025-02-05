import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import ImageKit from "imagekit";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
// import webPush from "web-push";

const allowedOrigins = [
  process.env.ORIGIN_1,
];

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }, // Allow only this origin
    credentials: true, // Allow credentials (cookies, headers)
  },
});

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }, // Allow only this origin
  credentials: true, // Allow credentials (cookies, headers)
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Socket.IO connection
io.on("connection", (socket) => {
  // console.log("A user connected:", socket.id);

  socket.on("DriversRoom", (driverId) => {
    socket.join(driverId);
    // console.log(`Driver ${driverId} joined their room`);
  });

  socket.on("UsersRoom", (userId) => {
    socket.join(userId);
    // console.log(`user ${userId} joined their room`);
  });

  // socket.leave("DriversRoom");
  // console.log(`Socket ${socket.id} left room DriversRoom`);

  socket.on("disconnect", () => {
    // console.log("User disconnected:", socket.id);
  });
});

// Route for consoling the body and the params received from front end.
app.use((req, res, next) => {
  // console.log(`Received ${req.method} request with body:`, req.body);
  // console.log(`Received ${req.method} request with params:`, req.params);
  next();
});

// Route for Authenticating the frontend for uploading images to the cloud( ImageKit ).
app.get("/auth-image-kit", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// routers
import userRouter from "./routes/user.routes.js";
import driverRouter from "./routes/driver.routes.js";
import orderRouter from "./routes/order.routes.js";
import adminRouter from "./routes/admin.routes.js";
import paymentRouter from "./routes/payment.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/driver", driverRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/payment", paymentRouter);

export { app, server, io };
