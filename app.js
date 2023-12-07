import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router  from './Routes/IndexRoutes.js';
import cors from 'cors'
import morgan from 'morgan';

const app=express();
const port=8000;
dotenv.config()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());





app.use('/api/v1',router)
mongoose.connect(process.env.MONGOURL).then(()=>console.log("YouTube Database Connected!"))
app.listen(port,console.log(`Server listening on port ${port}`))


