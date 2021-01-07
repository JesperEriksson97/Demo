import { gql } from '@apollo/client';

export const ADDRESS_ADD = gql`
  mutation AddAdress($street: String!, $city: String!, $zip: String!) {
    addAddress(street: $street, city: $city, zip: $zip) {
      success
      errors {
        path
        message
      }
    }
  }
`;

export const ADDRESS_UPDATE = gql`
  mutation updateAddress($street: String!, $city: String!, $zip: String!) {
    updateAddress(street: $street, city: $city, zip: $zip) {
      success
      errors {
        path
        message
      }
    }
  }
`;

export const ADDRESS_ORG_ADD = gql`
  mutation addOrgAddress($street: String!, $city: String!, $zip: String!) {
    addOrgAddress(street: $street, city: $city, zip: $zip) {
      success
      errors {
        path
        message
      }
    }
  }
`;
