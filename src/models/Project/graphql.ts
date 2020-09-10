import { PersonalProject, ProfessionalProject } from '.';

export const typeDef = `
extend type Query {
  personalProjects: [Project!]
  professionalProjects: [Project!]
}

type Project {
  name: String!
  techStack: [String!]!
  knowledgeGained: [String!]!
  link: String
  length: String
  achievements: [String!]
}
`;

export const resolvers = {
  Query: {
    personalProjects: async () => {
      const personalProjects = await PersonalProject.find();

      return personalProjects;
    },
    professionalProjects: async () => {
      const professionalProjects = await ProfessionalProject.find();

      return professionalProjects;
    },
  },
};
