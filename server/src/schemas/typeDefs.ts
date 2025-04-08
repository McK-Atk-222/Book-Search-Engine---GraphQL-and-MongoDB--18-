const typeDefs =`
Type Book {
    bookId: string!
    title: string!
    authors: [string]!
    description: string
    image: string
    link: string
}

type Auth {
    token: ID!
    profile: Profile
  }

type Query {
    me: User
}

type User {
    _id: ID
    username: string!
    email: string!
    bookCount: int
    savedBooks: [Book]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: String!, title: String!, authors: [String]!, description: String, image: String, link: String): User
    removeBook(bookId: String!): User
}
`;


export default typeDefs;