require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const app = express();

/* ===============================
   MIDDLEWARE
=============================== */
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ===============================
   DATABASE
=============================== */
connectDB(process.env.MONGO_URI);

/* ===============================
   API ROUTES
=============================== */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/classes", require("./routes/classRoutes"));
app.use("/api/assignments", require("./routes/assignmentRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/submissions", require("./routes/submissions"));

/* ===============================
   SERVER + SOCKET.IO
=============================== */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

/* ===============================
   SOCKET.IO – LIVE CLASS (FIXED)
=============================== */
io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  socket.on("join-class", (classId) => {
    socket.join(classId);
    console.log(`👤 ${socket.id} joined class ${classId}`);
  });

  socket.on("offer", ({ classId, offer }) => {
    socket.to(classId).emit("offer", offer);
  });

  socket.on("answer", ({ classId, answer }) => {
    socket.to(classId).emit("answer", answer);
  });

  socket.on("ice-candidate", ({ classId, candidate }) => {
    socket.to(classId).emit("ice-candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

/* ===============================
   START SERVER
=============================== */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
