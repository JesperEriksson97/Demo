import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query getUser {
    user {
      id
      username
      email
      createdAt
    }
  }
`;

export const ME_QUERY = gql`
  query getMe {
    me {
      id
      username
      email
      firstname
      lastname
      address {
        street
        city
        zip
      }
      role
    }
  }
`;

export const ME_QUERY_ORGANISATION = gql`
  query getMe {
    me {
      id
      organisation {
        name
        org_nr
        address {
          street
          zip
          city
        }
      }
    }
  }
`;

export const ME_QUERY_PRODUCTS = gql`
  query getMe {
    me {
      id
      organisation {
        products {
          id
          name
          price
          format
          images
          description
          categories
          stock
          currency {
            name
          }
        }
      }
    }
  }
`;

export const USER_SIGNUP = gql`
  mutation SignUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password) {
      success
      user {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

export const USER_SIGNIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      success
      token
      refreshToken
      user {
        id
        username
        email
        firstname
        lastname
        address {
          street
          city
          zip
        }
        role
      }
      errors {
        path
        message
      }
    }
  }
`;

export const USER_UPDATE = gql`
  mutation updateUser(
    $currentPassword: String!
    $username: String
    $email: String
    $firstname: String
    $lastname: String
  ) {
    updateUser(
      currentPassword: $currentPassword
      username: $username
      email: $email
      firstname: $firstname
      lastname: $lastname
    ) {
      success
      user {
        username
        email
        firstname
        lastname
      }
      errors {
        path
        message
      }
    }
  }
`;

export const PASSWORD_UPDATE = gql`
  mutation updatePassword($currentPassword: String!, $newPassword: String!) {
    updatePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      success
      errors {
        path
        message
      }
    }
  }
`;
