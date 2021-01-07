import { gql } from '@apollo/client';

export const FILE_UPLOAD = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const FILE_UPDATE = gql`
  mutation updateFile($file: Upload!, $oldFile: String!) {
    updateFile(file: $file, oldFile: $oldFile)
  }
`;
