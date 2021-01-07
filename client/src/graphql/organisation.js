import { gql } from '@apollo/client';

export const ORGANISATION_ADD = gql`
  mutation addOrganisation($name: String!, $org_nr: String!) {
    addOrganisation(name: $name, org_nr: $org_nr) {
      success
      errors {
        path
        message
      }
    }
  }
`;
