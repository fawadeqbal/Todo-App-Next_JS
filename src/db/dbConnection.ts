// dbConnection.ts

import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('DB Connected');
    });

    connection.on('error', (err) => {
      console.log('Failed to connect DB Error:' + err);
    });

    return connection;
  } catch (e) {
    console.log('Something went wrong');
    console.log(e);
    throw e; // Rethrow the error to handle it elsewhere if needed
  }
}

