import mongoose from 'mongoose'

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('using existing connection');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: process.env.MONGO_DB_NAME
        });

        console.log('new connection created');
        isConnected = true;
    } catch (error) {
        console.log('error connecting to db: ', error);
    }
}