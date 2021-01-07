import path from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

// Ändra ej - Importerar alla .resolvers.js filer från mappen
const resolversArray = loadFilesSync(path.join(__dirname, '.'));

module.exports = mergeResolvers(resolversArray);
