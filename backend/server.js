import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json()) // Parses incoming JSON requests and makes the data available in req.body.
app.use(cors())

/*
app.use(cors())
Purpose: Enables CORS (Cross-Origin Resource Sharing).

When to use: When your frontend (e.g., React app) and backend (Express) are on different domains or ports (e.g., localhost:3000 and localhost:5000).

Why needed: Browsers block cross-origin requests by default due to security reasons. cors() allows you to relax this restriction.
*/

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))