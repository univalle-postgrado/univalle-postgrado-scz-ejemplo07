import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql

enum Genre {
    NONE
    FICTION
    ROMANCE
}

type Book {
    id: ID!
    title: String!
    author: String
    genre: Genre
}

type Query {
    getBooks: [Book]
    getBooksCount: Int!
}
`;

const books = [
    {
        id: 1,
        title: 'El Principito',
        author: 'X',
        genre: 'ROMANCE'
    },
    {
        id: 2,
        title: 'Otro libro',
        author: 'Y',
        genre: 'NONE'
    }
];

const resolvers = {
    Query: {
        getBooks: () => books,
        getBooksCount: () => books.length
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log(`Server corriendo en: ${url}`);