import { gql } from '@apollo/client';

export const PRODUCT_ADD = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $categories: [String]!
    $images: [String]!
    $stock: Int!
    $format: String!
    $price: Int!
    $currencyId: ID!
  ) {
    addProduct(
      name: $name
      description: $description
      categories: $categories
      images: $images
      stock: $stock
      format: $format
      price: $price
      currencyId: $currencyId
    ) {
      success
      product {
        id
        name
        description
        categories
        images
        stock
        format
        price
      }
      errors {
        path
        message
      }
    }
  }
`;

export const PRODUCT_UPDATE = gql`
  mutation updateProduct(
    $id: ID!
    $name: String!
    $description: String!
    $categories: [String]!
    $images: [String]!
    $stock: Int!
    $format: String!
    $price: Int!
    $currencyId: ID!
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      categories: $categories
      images: $images
      stock: $stock
      format: $format
      price: $price
      currencyId: $currencyId
    ) {
      success
      product {
        id
        name
        description
        categories
        images
        stock
        format
        price
      }
      errors {
        path
        message
      }
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
      categories
      format
      currency {
        name
      }
      organisation {
        name
        address {
          street
          city
        }
      }
      images
      price
      stock
    }
  }
`;

export const PRODUCT_ALL_QUERY = gql`
  query getAllProducts {
    getAllProducts {
      id
      name
      format
      currency {
        name
      }
      organisation {
        name
        address {
          street
          city
        }
      }
      images
      price
    }
  }
`;

export const PRODUCT_BY_CATEGORY_QUERY = gql`
  query getProductsByCategory($category: [String], $offset: Int) {
    getProductsByCategory(category: $category, offset: $offset) {
      products {
        id
        name
        format
        currency {
          name
        }
        organisation {
          name
          address {
            street
            city
          }
        }
        images
        price
      }
      total
    }
  }
`;
