import { Project } from '.';

export const typeDef = `
extend type Query {
  projects: [Project!]
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
    projects: async () => {
      const projects = await Project.find();

      return projects;
    },
  },
};
