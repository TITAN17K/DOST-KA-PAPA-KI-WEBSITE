import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
dotenv.config()
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let port = process.env.PORT || 5000

let app = express()

app.use(express.json())
app.use(cookieParser())

// CORS configuration - allows both development and production
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL || "http://localhost:5000"
]

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true)
    } else {
      callback(null, true) // In production, serving from same origin
    }
  },
  credentials: true
}))

// API Routes
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)

// Serve static files for frontend and admin
app.use('/admin', express.static(path.join(__dirname, 'public/admin')))
app.use(express.static(path.join(__dirname, 'public/frontend')))

// Handle client-side routing - catch all non-API routes
app.use((req, res) => {
  // Check if the request is for admin panel
  if (req.path.startsWith('/admin')) {
    res.sendFile(path.join(__dirname, 'public/admin/index.html'))
  } else {
    // Otherwise serve frontend
    res.sendFile(path.join(__dirname, 'public/frontend/index.html'))
  }
})




app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
    console.log(`Frontend: http://localhost:${port}`)
    console.log(`Admin: http://localhost:${port}/admin`)
    connectDb()
})


