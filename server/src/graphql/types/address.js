export default `
  type Address {
    id: ID
    street: String
    city: String
    zip: String
  }

  type AddressResponse {
    success: Boolean
    errors: [Error!]
  }

  type Mutation {
    addAddress(street: String!, city: String!, zip: String!): AddressResponse!
    addOrgAddress(street: String!, city: String!, zip: String!): AddressResponse!
    updateAddress(street: String!, city: String!, zip: String!): AddressResponse!
  }
`;
