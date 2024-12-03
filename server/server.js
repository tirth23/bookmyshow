const express = require("express");
require("dotenv").config(); // To access the environment variables
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./config/dbconfig");
const userRouter = require("./routes/userRoute");
const movieRouter = require("./routes/movieRoute");
const theatreRouter = require("./routes/theatreRoute");
const showRouter = require("./routes/showRoute");
const bookingRouter = require("./routes/bookingRoute");

const app = express();
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    imgSrc: ["'self'", "data:"],
  },
}));
app.use(helmet());
// app.disable("x-powered-by"); // it will remove the x-powered-by header from the response

//first run npm run build inside client
const clientBuildPath = path.join(__dirname, "../client/build");
console.log(clientBuildPath);
// Serve static files from the React app
app.use(express.static(clientBuildPath));

app.use(
	cors({
		origin: "https://bookmyshow-5ul0.onrender.com", //use "*" to allow from all origin
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// Sanitize user input to prevent MongoDB Operator Injection
app.use(mongoSanitize());

app.use("/api/bookings/verify", express.raw({ type: "application/json" }));
app.use(express.json());
connectDB();

/* 
rate limit middleware: This middleware helps protect your server from being overwhelmed by too many requests 
from the same IP address within a specied time window.

The apiLimiter variable congures the rate limiter with a time window of 15 minutes and a maximum of 100 requests per IP within that
window. If the limit is exceeded, a message is sent to the client.
*/
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

/** Routes */
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

app.get("*", (req, res) => {
	res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

// app.listen(8082, () => {
// 	console.log("Server is running on port 8082");
// });

const PORT = process.env.PORT || 8082; // Use the PORT provided by Render or fallback to 8082 for local development

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
