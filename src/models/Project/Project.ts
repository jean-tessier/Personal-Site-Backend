import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  knowledgeGained: {
    type: [String],
    required: true,
  },
  link: String,
  length: String,
  achievements: [String],
});

export default mongoose.model('Project', schema);
