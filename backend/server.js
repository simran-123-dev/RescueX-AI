require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const aiRoutes = require("./routes/aiRoutes");
const profileRoutes = require("./routes/profileRoutes");
const chatRoutes = require("./routes/chatRoutes");

const { errorHandler } = require("./middlewares/errorHandler");
const { verifyToken } = require("./middlewares/authMiddleware");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URLS,
  "https://rescuex-ai-1.onrender.com",
]
  .filter(Boolean)
  .flatMap((value) => value.split(",").map((origin) => origin.trim()))
  .filter(Boolean);
const localOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
const renderOriginPattern = /^https:\/\/rescuex-ai(-\d+)?\.onrender\.com$/;

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.includes(origin) ||
      localOriginPattern.test(origin) ||
      renderOriginPattern.test(origin)
    ) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "RescueX AI backend alive",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/emergency", verifyToken, emergencyRoutes);
app.use("/api/ai", verifyToken, aiRoutes);
app.use("/api/profile", verifyToken, profileRoutes);
app.use("/api/chat", verifyToken, chatRoutes);

app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    server.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(console.error);
