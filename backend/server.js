const express = require("express");
const cors = require("cors");

const app = express();

const collegeRoutes = require("./routes/collegeRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const notFound = require("./middleware/notFoundMiddleware");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/colleges", collegeRoutes);

// Catch unhandled routes
app.use(notFound);

// Error Middleware (always last)
app.use(errorHandler);

// 🔥 IMPORTANT FIX FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
