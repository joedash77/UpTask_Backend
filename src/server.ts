import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
import { connectDB } from './config/db'
import authRoutes from './routes/authRoutes'
import projectRoutes from './routes/projectRoutes'

dotenv.config()

console.log('Frontend URL desde Render:', process.env.FRONTEND_URL || 'No está definida');
connectDB()

const app = express()
app.use(cors(corsConfig))

// Logging
app.use(morgan('dev'))

// Leer datos del formulario
app.use(express.json())

app.get('/api/test-cors', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    res.json({ message: 'CORS funcionando', frontend: process.env.FRONTEND_URL });
});

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)

export default app