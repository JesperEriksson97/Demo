export default `
  type Currency {
    id: ID
    name: String
    multiplier: Float
  }

  type CurrencyResponse {
    success: Boolean
    errors: [Error!]
  }

  type Query {
    getCurrencyById(id: ID!): Currency
    getCurrencies: [Currency]
  }

  type Mutation {
    addCurrency(name: String!, multiplier: Float!): CurrencyResponse!
    updateCurrency(id: ID!, name: String!, multiplier: Float!): CurrencyResponse!
  }
`;
