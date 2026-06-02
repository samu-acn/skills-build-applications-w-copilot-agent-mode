import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = 8000
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker'

// Middleware
app.use(express.json())

// MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    process.exit(1)
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker Backend is running' })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
async function startServer() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
}

startServer().catch(console.error)
