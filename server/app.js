import { config } from 'dotenv';
config();
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js'
import courseRoutes from './routes/course.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import misRoutes from './routes/miscellaneous.routes.js'
import youtubeRoutes from './routes/scrapped.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('tiny'));
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

app.use(cookieParser());

// routes test
app.use('/ping', function(req, res){
    res.send('Pong');
})

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', misRoutes);
app.use('/api/v1/youtube', youtubeRoutes);

// Other BAD Requests
app.all('*', (req, res)=>{
    res.status(404).send('OOPS!! 404 page not found');
})

app.use(errorMiddleware);

export default app;