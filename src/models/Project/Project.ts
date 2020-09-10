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

const PersonalProject = mongoose.model('PersonalProject', schema);
const ProfessionalProject = mongoose.model('ProfessionalProject', schema);

export { PersonalProject, ProfessionalProject };
