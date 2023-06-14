import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import { mongodbConfig } from './configs/mongodb.config';
import cors from 'cors';
import route from './routes';

mongodbConfig();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
route(app);

app.listen(3000, () => console.log('Listening on port 3000'));
