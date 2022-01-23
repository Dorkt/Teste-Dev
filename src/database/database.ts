import mongoose, { Mongoose } from 'mongoose';
import dontev from 'dotenv'

dontev.config()

const database: string = process.env.CONNECTION_DB ? process.env.CONNECTION_DB : '';

export const connect = async (): Promise<Mongoose | void> =>
  mongoose.connect(database, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export const close = (): Promise<void> => mongoose.connection.close();
