import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        tag
        price
        quantity
        category {
          name
        } 
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct($name: String!, $description: String, $tag: String, $image: String, $price: Float!, $quantity: Int, $category: ID!, $user: ID!) {
    addProduct(name: $name, description: $description, tag: $tag, image: $image, price: $price, quantity: $quantity, category: $category, user: $user) {
        _id
      name
      description
      tag
      price
      quantity
      category {
        name
      } 
      user {
        _id
      }
    }
  }
`;