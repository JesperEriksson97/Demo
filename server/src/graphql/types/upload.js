export default `
  scalar Upload

  type Mutation {
    uploadFile(file: Upload!): String
    updateFile(file: Upload!, oldFile: String!): String
  }
`;
