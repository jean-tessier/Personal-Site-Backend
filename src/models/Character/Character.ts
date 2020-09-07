import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.model('Character', characterSchema);
