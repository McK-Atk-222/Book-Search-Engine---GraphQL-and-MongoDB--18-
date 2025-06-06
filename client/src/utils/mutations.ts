import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId: String!, $title: String!, $authors: [String]!, $description: String, $image: String, $link: String) {
    saveBook(bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
      _id
      username
      savedBooks{ bookId, title, authors, description, image, link }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      savedBooks{ bookId, title, authors, description, image, link }
    }
  }
`;