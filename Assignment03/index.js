import express from 'express';
import fileRouter from './routes/fileRoute.js';
const app = express();

app.use(express.json());

app.use('/api', fileRouter);

app.listen(5000, console.log('Server is started at port 5000'));
