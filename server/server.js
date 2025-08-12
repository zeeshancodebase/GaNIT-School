const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./db/conn");
const errorMiddleware = require("./middlewares/errorMiddleware");
const jobRoutes = require('./router/job.routes');
const userRoutes = require('./router/user.routes');
const authRoutes = require('./router/auth.routes');
const candidateRoutes = require('./router/candidate.routes');
const collegeRoutes = require('./router/college.routes');

const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: true, // reflects the request origin
  // origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true, // 🔥 required for cookies, auth headers
};
app.use(cors(corsOptions));


// app.use(helmet());
// app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);    
app.use('/api/user', userRoutes);   
app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use("/api/colleges", collegeRoutes);


// // Routes
// app.get("/", (req, res) => res.send("Welcome to GaNIT School API"));

// // app.use(errorMiddleware);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
