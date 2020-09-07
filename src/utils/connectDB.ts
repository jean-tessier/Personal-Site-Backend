import mongoose from 'mongoose';

// const URL = 'mongodb://127.0.0.1:27017/game-of-thrones';

const connectDB = (host: string, port: string, db: string) => {
  const url = `mongodb://${host}:${port}/${db}`;
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once('open', (_) => {
    console.log('Database connected:', db);
  });
  mongoose.connection.on('error', (err) => {
    console.error('connection error:', err);
  });

  return mongoose.connection;
};

export default connectDB;
