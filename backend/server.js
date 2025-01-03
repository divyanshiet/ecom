import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import productRouter from './routes/productRoute.js'
import userRouter from './routes/userRouter.js'

// App config

const app = express()
const port = process.env.Port || 4000
connectDB()
connectCloudinary()
// middlewares
app.use(express.json())
app.use(cors())


// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.get('/',(req,res)=>{
res.send("API Working")
})

app.listen(port,()=>console.log('Server started on Port: '+ port))