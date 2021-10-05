import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
//Routes
import phoneslistRoutes from './routes/phoneslist.js'
import phoneRoutes from './routes/phone.js'

dotenv.config()
connectDB()
const app = express()

//Body Parser Middleware
app.use(express.json())

app.use(cors())
app.options('*', cors())

// Use routes
app.use('/phoneslist', phoneslistRoutes)
app.use('/phone', phoneRoutes)

app.get('/', (req, res) => {
  res.send('Hello from node')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server run at port ${PORT}`))
