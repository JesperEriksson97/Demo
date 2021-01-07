export default `
  type User {
    id: ID
    username: String
    firstname: String
    lastname: String
    email: String
    address: Address
    organisation: Organisation
    role: String
    createdAt: String
  }

  type UserResponse {
    success: Boolean!
    user: User
    errors: [Error!]
  }
  
  type SignInResponse {
    success: Boolean!
    token: String
    refreshToken: String
    user: User
    errors: [Error!]
  }

  type Query {
    user: User
    me: User
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): UserResponse!
    signIn(email: String!, password: String!): SignInResponse!
    updateUser(currentPassword: String!, username: String, email: String, firstname: String, lastname: String): UserResponse!
    updatePassword(currentPassword: String!, newPassword: String!): UserResponse!
  }
`;
