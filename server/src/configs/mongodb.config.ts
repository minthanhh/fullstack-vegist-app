import mongoose from 'mongoose';

export function mongodbConfig() {
  mongoose.connect(
    'mongodb://127.0.0.1:27017/vegist?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1'
  );
  mongoose.connection
    .once('open', () => console.log('Connected to MongoDB Successfully'))
    .on('error', (err) => console.log(err));
}
