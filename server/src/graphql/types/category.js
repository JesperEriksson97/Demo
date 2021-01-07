export default `
  type Category {
    id: ID!,
    label: String!
    value: String!
  }
  
  type Query {
    categories: [Category!]
  }
`;
