import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

// Ändra ej - Importerar alla filer från mappen
const typesArray = loadFilesSync(path.join(__dirname, '.'));

module.exports = mergeTypeDefs(typesArray);
