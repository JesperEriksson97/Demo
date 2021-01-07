export default `
  type Product {
    id: ID
    name: String
    slug: String
    description: String
    categories: [String]
    images: [String]
    stock: Int
    format: String
    price: Int
    currency: Currency
    organisation: Organisation
  }

  type ProductResponse {
    success: Boolean
    product: Product
    errors: [Error!]
  }


  type ProductsWithPagination {
    products: [Product!]
    total: Int
  }

  type Query {
    getProduct(id: ID!): Product
    getAllProducts: [Product]
    getProductsByCategory(category: [String], offset: Int): ProductsWithPagination
  }

  type Mutation {
    addProduct(name: String!, description: String!, categories: [String]!, images: [String]!, stock: Int!, format: String!, price: Int!, currencyId: ID!): ProductResponse!
    updateProduct(id: ID!, name: String!, description: String!, categories: [String]!, images: [String]!, stock: Int!, format: String!, price: Int!, currencyId: ID!): ProductResponse!
    removeProduct(id: ID!): ProductResponse!
    _removeAllProducts: ProductResponse!
  }
`;
