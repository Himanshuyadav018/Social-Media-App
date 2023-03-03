import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import app from '../index.js'

dotenv.config()

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT)))
.catch(err => console.log(err))