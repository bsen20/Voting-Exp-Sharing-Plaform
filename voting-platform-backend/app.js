const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const experienceRoutes = require("./routes/experience");
const issueRoutes = require("./routes/issue");
const filterRoutes = require("./routes/filter");
const experienceController = require("./controllers/experienceController");
const issueController = require("./controllers/issueController");
const analyticsRoutes = require("./routes/analytics");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend address
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/filter", filterRoutes);

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });
});

// Initialize socket.io in controllers
experienceController.init(io);
issueController.init(io);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
