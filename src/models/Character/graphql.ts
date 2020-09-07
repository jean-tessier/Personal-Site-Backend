import { Character } from '.';

export const typeDef = `
extend type Query {
  characters: [Character!]
}

type Character {
  name: String!
}
`;

export const resolvers = {
  Query: {
    characters: async () => {
      const characters = await Character.find();

      return characters;
    },
  },
};
