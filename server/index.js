import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'

import './mongodb/db.js'
import userRouter from './routers/users.js'
import postRouter from './routers/posts.js'

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}));

app.use('/posts', postRouter)
app.use('/user', userRouter)

export default app