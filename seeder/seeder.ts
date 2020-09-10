import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import 'colors';

import loadConfig from '../src/utils/loadConfig';
import connectDB from '../src/utils/connectDB';
import { PersonalProject, ProfessionalProject } from '../src/models/Project';

const getDataFromFile = (filename: string) => {
  const data = JSON.parse(fs.readFileSync(filename, 'utf-8'));

  return data;
};

const seedProjects = async () => {
  try {
    const config = loadConfig();
    const dbConfig = config.database;
    await connectDB(dbConfig.ip, dbConfig.name, dbConfig.port);

    const projects = getDataFromFile(path.join(__dirname, 'projects.json'));

    await PersonalProject.create(projects.personal);
    console.log(`Personal projects seeded...`.green);
    await ProfessionalProject.create(projects.professional);
    console.log(`Professional projects seeded...`.green);
  } catch (err) {
    console.error(err);
  }

  mongoose.connection.close();
};

const deleteProjects = async () => {
  try {
    const config = loadConfig();
    const dbConfig = config.database;
    await connectDB(dbConfig.ip, dbConfig.name, dbConfig.port);

    await PersonalProject.deleteMany({});
    console.log(`Personal projects deleted...`.red);
    await ProfessionalProject.deleteMany({});
    console.log(`Professional projects deleted...`.red);
  } catch (err) {
    console.error(err);
  }

  mongoose.connection.close();
};

const runSeeder = async (flag: string) => {
  switch (flag) {
    case '-i':
      await seedProjects();
      break;
    case '-d':
      await deleteProjects();
      break;
    case '-di':
      await deleteProjects();
      await seedProjects();
      break;
    default:
      console.log(`Requires one of: '-i', '-d', '-di'`);
      break;
  }
};

runSeeder(process.argv[2]);
