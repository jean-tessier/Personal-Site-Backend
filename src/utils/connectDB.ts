import mongoose from 'mongoose';

const connectDB = async (host: string, db: string, port?: string) => {
  const mongoUserInfo =
    !!process.env.DB_USER && !!process.env.DB_PASS
      ? `${process.env.DB_USER}:${process.env.DB_PASS}@`
      : '';
  const uriPrefix = !!port ? `mongodb` : `mongodb+srv`;
  const mongoAddress = `${host}` + (!!port ? `:${port}` : '');
  const url = `${uriPrefix}://${mongoUserInfo}${mongoAddress}/${db}`;
  console.log(`Connecting to ${url}`.bgYellow);
  await mongoose.connect(url, {
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
