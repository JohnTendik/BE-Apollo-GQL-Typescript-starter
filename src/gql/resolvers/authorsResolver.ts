import { QueryAuthorArgs, Author } from "../../__generated__/globalTypes";

const authors = [
  {
    books: [
      {
        title: "The Awakening",
        author: "Kate Chopin",
      },
      {
        title: "Test book",
        author: "Kate Chopin",
      },
    ],
    name: "Kate Chopin",
  },
];

export default {
  Query: {
    author: (parent: any, { name }: QueryAuthorArgs): Author => {
      return authors.filter((author) => author.name === name)[0] ?? null;
    },
  },
  Mutation: {},
};
