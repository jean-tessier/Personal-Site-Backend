import { IResolvers } from 'graphql-tools';
// import mongoose from 'mongoose';
import Character from './models/Character';

const resolverMap: IResolvers = {
  Query: {
    helloWorld: async (_: void, args: void) => {
      const p1 = new Promise((resolve, reject) => {
        let wait = setTimeout(() => {
          clearTimeout(wait);
          resolve('Hello World!');
        }, 5000);
      });
      return await p1;
    },
    characters: async (_: void, args: void) => {
      const characters = await Character.find();

      return characters;
    },
  },
};

export default resolverMap;
