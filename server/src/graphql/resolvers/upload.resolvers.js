import { createWriteStream, unlink } from 'fs';
import { GraphQLUpload } from 'apollo-server-express';



const shortid = require('shortid');
let slugify = require('slugify');

const uploadDir = './public/media';

const processUpload = ({ stream, filename }) => {
  const id = shortid.generate();
  const slugName = slugify(filename, { lower: true });
  const directory = `${uploadDir}/${id}-${slugName}`;
  const name = `${id}-${slugName}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(directory))
      .on('finish', () => resolve({ name }))
      .on('error', () =>
        reject({ message: 'Something went wrong in processUpload' })
      )
  );
};

export default {
  Upload: GraphQLUpload,

  Mutation: {
    uploadFile: async (_, { file }) => {
      try {
        const { createReadStream, filename } = await file;
        const stream = createReadStream();
        const { name } = await processUpload({ stream, filename });
        return name;
      } catch (err) {
        console.error(err.message);
      }
    },
    updateFile: async (_, { file, oldFile }) => {
      try {
        unlink(`${uploadDir}/${oldFile}`, (err) => {
          if (err) {
            console.error(err)
            return
          }
        })
        const { createReadStream, filename } = await file;
        const stream = createReadStream();
        const { name } = await processUpload({ stream, filename });
        return name;
      } catch (err) {
        console.error(err.message);
      }
    },
  },
};
