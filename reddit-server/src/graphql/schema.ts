import { gql } from "apollo-server-express";

const schema = gql`
  scalar Date
  type User {
    id: ID!
    email: String!
    username: String!
    createdAt: Date!
    updatedAt: Date!
  }
  type UserSession {
    user: User!
    createdAt: Date!
    expiresAt: Date!
  }
  type MessageRelation {
    senderId: String!
    receiverId: String!
  }
  type Message {
    id: ID!
    body: String!
    createdAt: Date!
    relations: MessageRelation!
  }

  type Query {
    userSession(me: Boolean!): UserSession
    getMessages(me: Boolean!): [Message]!
  }
  type Mutation {
    createUser(email: String!, username: String!, password: String!): User!
    createUserSession(email: String!, password: String!): UserSession!
    deleteUserSession(me: Boolean!): Boolean!

    createMessage(receiverId: String!, message: String!): Boolean!
  }
`;

export default schema;
