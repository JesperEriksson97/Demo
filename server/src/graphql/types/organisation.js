export default `
  type Organisation {
    name: String
    org_nr: String
    address: [Address!]
    products: [Product!]
  }

  type AddedOrganisation {
    success: Boolean
    errors: [Error!]
  }

  type Mutation {
    addOrganisation(name: String!, org_nr: String!): AddedOrganisation!
  }
`;
